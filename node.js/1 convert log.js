var path = '../sources/rp13-hashed/';

var fs = require('fs');

var entriesObj = [];
var entriesArr = [];

var files = fs.readdirSync(path);

files.sort();

files.forEach(function (file, index) {
	if (/clients_0[5-8]\.05\._[0-3][0-9][0-5][0-9]_hashed/.test(file)) {
		var day = file.substr(8,2);
		var hour = file.substr(15,2);
		var minute = file.substr(17,2);
		var date = new Date(2013, 4, day, hour, minute, 0, 0);

		console.log(file);
		processFile(path+file, index, date);
		
		//process.exit();
	} else {
		// 
		console.warn('unknown file: '+file);
	}
})

console.log('Schreibe Object-JSON');
fs.writeFileSync('../cleaned/rp13-obj.json', JSON.stringify(entriesObj), 'utf8');
fs.writeFileSync('../cleaned/rp13-obj-pretty.json', JSON.stringify(entriesObj, null, '\t'), 'utf8');

console.log('Schreibe Array-JSON');
fs.writeFileSync('../cleaned/rp13-arr.json', JSON.stringify(entriesArr), 'utf8');
fs.writeFileSync('../cleaned/rp13-arr-pretty.json', JSON.stringify(entriesArr, null, '\t'), 'utf8');

console.log('Schreibe TSV');
fs.writeFileSync('../cleaned/rp13.tsv', entriesArr.map(function (o) { return o.join('\t'); }).join('\n'), 'utf8');

console.log('Schreibe CSV');
fs.writeFileSync('../cleaned/rp13.csv', entriesArr.map(function (o) { return o.join(','); }).join('\n'), 'utf8');

function processFile(file, index, date) {
	var lines = fs.readFileSync(file, 'utf8').split('\n');
	lines.forEach(function (line) {
		if (line != '') {
			line = line.split('\t');
			var vendor = line[0];
			line = line[1].split(' ');
			if ((line.length == 17) && (line[0] != 'Total:')) {
				var access_point = line[0];
				var i = access_point.lastIndexOf('ap-');
				if (i < 0) {
					console.error(access_point);
					process.exit();
				}
				access_point = access_point.substr(i);

				var obj = {
					date: date,
					file_id: index,
					access_point: access_point,
					vendor: vendor,
					mac_hash: line[1],
					signal_strength: parseInt(line[2], 10),
					mb_in: parseInt(line[4], 10),
					mb_out: parseInt(line[7], 10),
					speed_in: parseInt(line[12], 10),
					speed_out: parseInt(line[10], 10),
					duration: parseInt(line[14], 10)
				};

				entriesObj.push(obj);

				entriesArr.push([
					obj.date,
					obj.file_id,
					obj.access_point,
					obj.vendor,
					obj.mac_hash,
					obj.signal_strength,
					obj.mb_in,
					obj.mb_out,
					obj.speed_in,
					obj.speed_out,
					obj.duration
				]);
			}
		}
	})
}
