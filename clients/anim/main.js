var currentTime = 60*(24*2+9);
var clients = [];
var context;
var width = 1024;
var height = 500;

var decay = 0.5;
var timeStep = 1;
var stepSize = 50*timeStep;
var frameDuration = 50;

var interval;

$(function () {
	init();
	start();
})

function init() {
	context = $('#canvas')[0].getContext('2d');
	clients = [];
	data.matrix.forEach(function (times, index) {
		clients[index] = {point:undefined, x:0, y:0, r:0, x0:0, y0:0, r0:0};
		random[index] = Math.random();
	});
	
	var menu = $('#menu');
	for (var i = 2; i < 16; i++) {
		(function () {
			var time = i*6*60;
			var d = Math.floor(i/4);
			var h = (i % 4)*6;
			var node = $('<span class="button">T'+d+' '+h+':00</span>');
			node.click(function () {
				currentTime = time;
				start();
			})
			menu.append(node);
		})();
	}
}

function start() {
	if (!interval) interval = setInterval(update, frameDuration);
	setTimeout(stop, 10000);
}

function stop() {
	if (interval) {
		clearInterval(interval);
		interval = false;
	}
}

function update() {
	currentTime += timeStep;
	if (currentTime >= 4*24*60) {
		stop();
		return;
	}

	renderTime();
	updateData();
	updatePosition();
	renderCanvas();
}

function renderTime() {
	var d = Math.floor(currentTime/1440);
	var h = Math.floor(currentTime/60) % 24;
	var m = Math.floor(currentTime) % 60;
	h = (h+100+'').substr(1);
	m = (m+100+'').substr(1);
	$('#timer').html('Tag '+d+' - '+h+':'+m);
}

function updateData() {
	var timeId = -1;
	data.times.forEach(function (time, index) {
		if (time < currentTime) timeId = index;
	});

	var points = [];
	data.points.forEach(function (point, index) {
		points[index] = [];
	})

	data.matrix.forEach(function (times, index) {
		var point = undefined;
		if (isFinite(times[timeId])) point = times[timeId];

		var client = clients[index];
		if ((client.point != point) && (Math.random() > 0.8)) {
			if (valid(point)) {
				client.x0 = data.points[point].x;
				client.y0 = data.points[point].y;
				client.r0 = 1;
				if (!valid(client.point)) client.x = undefined;
			} else {
				client.r0 = 0;
			}
			client.point = point;
		}
		if (valid(client.point)) points[client.point].push(index);
	});

	points.forEach(function (clientList, pointIndex) {
		var point = data.points[pointIndex];
		var x0 = point.x*width;
		var y0 = point.y*height;
		clientList.forEach(function (clientIndex, index) {
			var client = clients[clientIndex];
			var a = Math.sqrt(index)*4;
			var r = Math.sqrt(index)*1.5;
			client.x0 = x0 + Math.cos(a)*r;
			client.y0 = y0 + Math.sin(a)*r;
			if (client.x === undefined) {
				client.x = client.x0;
				client.y = client.y0;
			}
		})

	});
}

function updatePosition() {
	clients.forEach(function (client) {
		client.xo = client.x;
		client.yo = client.y;

		var dx = (client.x0 - client.x);
		var dy = (client.y0 - client.y);
		var r = Math.sqrt(dx*dx + dy+dy);
		if (r > 1e-2) {
			var rn = Math.max(r-stepSize, 0);
			var f = 1-rn/r;

			client.x += (client.x0 - client.x)*f;
			client.y += (client.y0 - client.y)*f;
		} else {
			client.x = client.x0;
			client.y = client.y0;
		}
		client.r += (client.r0 - client.r)*decay;
	})
}

function renderCanvas() {
	context.clearRect(0, 0, width, height);
	context.fillStyle = '#F00';

	clients.forEach(function (client) {
		if (client.r > 1e-2) {
			var dx = client.x - client.xo;
			var dy = client.y - client.yo;
			var r = Math.sqrt(dx*dx + dy*dy);

			if (r > 1) {
				var a = Math.min(10/r, 1);
				context.strokeStyle = 'rgba(255,0,0,'+a+')';
				context.beginPath();
				context.moveTo(client.xo, client.yo);
				context.lineTo(client.x,  client.y );
				context.stroke();

			} else {
				context.beginPath();
				context.arc(client.x, client.y, client.r, 0, 2*Math.PI, false);
				context.fill();
			}
		}
	});
}

function valid(point) {
	return (point != null) && (point !== undefined);
}

