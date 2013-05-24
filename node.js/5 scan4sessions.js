var fs = require('fs');

var roomTranslation = {
	'lounge': false,
	'garderobe': false,
	'foyer': false,
	'raucherhof': false,
	'hof': false,
	'cafeteria': false,
	'vip': false,
	'refillbar': false,
	'stage1': 'stage1',
	'stage2': 'stage2',
	'stage3': 'stage3',
	'stage4': 'stage4',
	'stage5': 'stage5',
	'stage6': 'stage6',
	'stage7': 'stage7',
	'workshop1': 'workshopa',
	'workshop2': 'workshopb',
	'workshop3': 'workshopc',
	'workshop4': 'workshopd'
};

var log = fs.readFileSync('../cleaned/rp13-obj.json', 'utf8');
log = JSON.parse(log);

var accesspoints = fs.readFileSync('../cleaned/accesspoints.json', 'utf8');
accesspoints = JSON.parse(accesspoints);

var sessions = fs.readFileSync('../sources/sessions.json', 'utf8');
sessions = JSON.parse(sessions);

var sessionLookup = {};
sessions.forEach(function (session, index) {
	var room = session.room.replace(/\s/g, '').toLowerCase();
	if (sessionLookup[room] === undefined) sessionLookup[room] = [];
	var t0 = (parseInt(session.date.substr(9,1),10) - 5)*1440 + session.startInt;
	var t1 = t0 + session.duration;
	for (var t = t0; t < t1; t++) {
		sessionLookup[room][t] = index;
	}
	session.macs = {};
	session.macCount = 0;
	session.title = session.title.replace(/^\s+|\s+$/g, '');
	if (session.title == 'brand eins') session.title += ' - ' + session.persons.join(', ');
	session.title = session.title.replace(/[^a-zäöüß0-9\:\-\.\?\!]+/gi, ' ');
});

log.forEach(function (entry) {
	var time = Math.round(((new Date(entry.date)).getTime()-1367712000000)/60000+120);
	if (!accesspoints[entry.access_point]) return;
	var room = accesspoints[entry.access_point].group;
	var correctRoom = roomTranslation[room];
	if (!correctRoom) return;
	
	var sessionId = sessionLookup[correctRoom][time];
	
	if (sessionId === undefined) return;
	
	var session = sessions[sessionId];

	var mac = entry.mac_hash;
	if (session.macs[mac] === undefined) session.macs[mac] = 0;
	session.macs[mac]++;
	session.macCount++;
});

var n = 0;
newSessions = [];
sessions.forEach(function (session) {
	if (session.macCount > 50) {
		var count = [];
		Object.keys(session.macs).forEach(function (mac) {
			count.push(session.macs[mac]);
		});
		count.sort();
		var m = count[Math.floor(count.length/2)];

		var macs = {};
		var mCount = 0;
		Object.keys(session.macs).forEach(function (mac) {
			if (session.macs[mac] >= m) {
				macs[mac] = 1;
				mCount++;
			}
		});

		session.macs = macs;
		session.macCount = mCount;

		newSessions.push(session);
		n += mCount;
	}
})
sessions = newSessions;

var matrix = [];
for (var i = 0; i < sessions.length; i++) matrix[i] = [];
console.log(n);
n = 2523;
var edges = ['source\ttarget\tweight'];
var nodes = ['id\tlabel\tsize'];
for (var i = 0; i < sessions.length; i++) {
	var session1 = sessions[i];
	var p1 = session1.macCount;
	nodes.push([session1.title, session1.title, p1].join('\t'));
	matrix[i][i] = p1;
	for (var j = i+1; j < sessions.length; j++) {
		var session2 = sessions[j];
		var p2 = session2.macCount;
		var c = 0;
		Object.keys(session1.macs).forEach(function (mac) {
			if (session2.macs[mac] !== undefined) {
				c += Math.min(session1.macs[mac], session2.macs[mac]);
			}
		});
		var v = 10*(c - p1*p2/n)/n;
		v = Math.pow(Math.abs(v), 2)*((v > 0) ? 1 : -1);
		if (v > 1e-4) {
			edges.push([session1.title, session2.title, v].join('\t'));
		}
	}
}

fs.writeFileSync('edges.csv', edges.join('\n'), 'utf8');
fs.writeFileSync('nodes.csv', nodes.join('\n'), 'utf8');

/*

var ap = new Lookup();
Object.keys(accesspoints).forEach(function (name) {
	var point = accesspoints[name];
	var name = Math.round(point.x*100)+'_'+Math.round(point.y*50);
	point.name = name;
	ap.add(name);
});

var condensedAccesspoints = [];
Object.keys(accesspoints).forEach(function (name) {
	var point = accesspoints[name];
	point.index = ap.getId(point.name);
	condensedAccesspoints[point.index] = {
		x: point.x,
		y: point.y,
		room: point.group
	};
});

var macs = new Lookup();
var times = new Lookup();

log.forEach(function (entry) {
	if (accesspoints[entry.access_point] === undefined) return;

	entry.time = ((new Date(entry.date)).getTime()-1367712000000)/60000+120;
	times.add(entry.time);

	macs.add(entry.mac_hash);
});

times.sort(function (a,b) { return a-b });

var newEntries = [];
var csv = [['Zeit','Accesspoint','Raum','x (ungefähr)','y (ungefähr)','fortlaufende Gerätenummer'].join(',')];
log.forEach(function (entry) {
	if (accesspoints[entry.access_point] === undefined) return;

	var mac = macs.getId(entry.mac_hash);
	var time = times.getId(entry.time);
	var point = accesspoints[entry.access_point].index;

	if (newEntries[mac] === undefined) newEntries[mac] = [];
	newEntries[mac][time] = point;
	csv.push([
		entry.date,
		entry.access_point,
		condensedAccesspoints[point].room,
		condensedAccesspoints[point].x*2,
		condensedAccesspoints[point].y,
		mac
	].join(','));
});

var result = {
	times: times.getJSON(),
	points: condensedAccesspoints,
	matrix: newEntries
};

var json = JSON.stringify(result );
json = json.replace(/null/g, '');

fs.writeFileSync('../clients/anim/data.js', 'var data = '+json, 'utf8');
fs.writeFileSync('../clients/anim/republica13-wlan-data.csv', csv.join('\n'), 'utf8');




function Lookup() {
	var me = this;
	var entry2index = {};
	var index2entry = [];

	me.add = function (entry) {
		if (entry2index[entry] === undefined) {
			var index = index2entry.length;
			entry2index[entry] = index;
			index2entry[index] = entry;
		}
	}

	me.sort = function (callback) {
		entry2index = {};
		index2entry = index2entry.sort(callback);
		index2entry.forEach(function (entry, index) {
			entry2index[entry] = index;
		})
	}

	me.getId = function (entry) {
		return entry2index[entry];
	}

	me.getJSON = function () {
		return index2entry.slice(0);
	}

	return me;
}
*/