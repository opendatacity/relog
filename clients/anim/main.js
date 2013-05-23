var startTime = (24*1 +  9)*60;
var minTime =   (24*0 + 15)*60;
var maxTime =   (24*3 + 24)*60;


var currentTime = startTime;
var clients = [];
var context;
var width = 950;
var height = 475;
var gridSize = 3;
var nearFieldRadius = 30;

var timeStep = 1000/1500; //(250, 500, 1000)
var decay = Math.pow(0.8, 5);
var stepSize = 100*timeStep;
var frameDuration = 40;
var radius = 1.4;
var jump = false;
var maxStepGridRadius = 10;
var stepGridRadius = maxStepGridRadius;
var nearFieldGridRadius = Math.ceil(nearFieldRadius/gridSize);

var interval;
var time2index = [];
var random = [];
var stepGrid = [];
var nearFieldGrid = [];
var grid = [];

for (var x = -nearFieldGridRadius; x < width/gridSize+nearFieldGridRadius; x++) grid[x] = [];

$(function () {
	init();
	setSpeed(2);
	startPlay();
})

function setSpeed(speed) {
	timeStep = Math.pow(2, speed)*125/1500;
	stepSize = 100*timeStep;
	stepGridRadius = Math.min(Math.ceil(stepSize/gridSize), maxStepGridRadius);
	nearFieldGridRadius = Math.ceil(nearFieldRadius/gridSize);

	$('.speed').removeClass('active');
	$('#speed'+speed).addClass('active');
}

var mouseDrag = false;
var sliderDrag = false;
var mapDrag = false;
var mouseDragX0;
var mouseDragY0;
var mouseDragX;
var mouseDragY;
var sliderDragStartTime;
var selectedCount = 0;

function sliderDragStart(x) {
	mouseDrag = true;
	sliderDrag = true;
	sliderDragStartTime = currentTime;
	mouseDragX = x;
	mouseDragX0 = x;
}

function mapDragStart(x, y) {
	mouseDrag = true;
	mapDrag = true;
	mouseDragX = x;
	mouseDragY = y;
	mouseDragX0 = x;
	mouseDragY0 = y;

	selectedCount = 0;
	activeCount = 0;
	activeSelectedCount = 0;

	clients.forEach(function (c) { c.selected = false; });

	renderCanvas();
	renderInfos();
}

function mouseDragMove(x, y) {
	if (mouseDrag) {
		if (sliderDrag) {
			currentTime = sliderDragStartTime + (mouseDragX0 - x);

			updateFrame();	
		}
		if (mapDrag) {
			mouseDragX = x;
			mouseDragY = y;
			var p = $('#container').offset();
			var x0 = Math.min(mouseDragX0, mouseDragX) - p.left;
			var x1 = Math.max(mouseDragX0, mouseDragX) - p.left;
			var y0 = Math.min(mouseDragY0, mouseDragY) - p.top;
			var y1 = Math.max(mouseDragY0, mouseDragY) - p.top;
			selectedCount = 0;
			activeCount = 0;
			activeSelectedCount = 0;
			clients.forEach(function (c) {
				if ((c.x >= x0) && (c.x <= x1) && (c.y >= y0) && (c.y <= y1)) {
					c.selected = true;
					selectedCount++;
				} else {
					c.selected = false;
				}
				if (c.point !== undefined) {
					activeCount++;
					if (c.selected) activeSelectedCount++;
				}
			});

			renderCanvas();
			renderInfos();
		}

		event.preventDefault();
		return false;
	} else {
		mouseDragX0 = x;
		mouseDragY0 = y;
	}
}

function mouseDragStop() {
	mouseDrag = false; 
	sliderDrag = false;
	mapDrag = false;

	renderCanvas();
}

function init() {
	context = $('#canvas')[0].getContext('2d');
	clients = [];
	var v = 0.2;

	data.matrix.forEach(function (times, index) {
		clients[index] = { point:undefined, x:0, y:0, r:0, x0:0, y0:0, r0:0, index:index, lastEvent:0, selected:false };
		var v = (1.1+Math.sin(index))*1e6;
		random[index] = v - Math.floor(v);
	});

	$('#play'  ).click(togglePlay);
	$('#speed1').click(function () { setSpeed(1); });
	$('#speed2').click(function () { setSpeed(2); });
	$('#speed3').click(function () { setSpeed(3); });

	$('#sliderWrapper').mousedown(function (e) {
		sliderDragStart(e.pageX);
		e.preventDefault();
		return false;
	});
	$('#sliderWrapper').get(0).addEventListener('touchstart', function (e) {
		sliderDragStart(e.touches[0].pageX);
		e.preventDefault();
		return false;
	}, false);

	$('#container').mousedown(function (e) {
		mapDragStart(e.pageX, e.pageY);
		e.preventDefault();
		return false;
	});
	$('#container').get(0).addEventListener('touchstart', function (e) {
		mapDragStart(e.touches[0].pageX, e.touches[0].pageY);
		e.preventDefault();
		return false;
	}, false);


	$(document).mousemove(function (e) {
		mouseDragMove(e.pageX, e.pageY);
	});
	$(document).get(0).addEventListener('touchmove', function (e) {
		mouseDragMove(e.touches[0].pageX, e.touches[0].pageY);
	}, false);


	$(document).mouseup(function () {
		mouseDragStop();
	});
	$(document).get(0).addEventListener('touchend', function () {
		mouseDragStop();
	}, false);

	var index = -1;
	for (var time = -60; time <= (4*24+1)*60; time++) {
		while (data.times[index+1] <= time) index++;
		time2index[time] = index;
	}

	for (var x = -stepGridRadius; x <= stepGridRadius; x++) {
		for (var y = -stepGridRadius; y <= stepGridRadius; y++) {
			var r = Math.round(Math.sqrt(x*x + y*y)*100)/100;
			if (r <= stepGridRadius+1) {
				stepGrid.push({x:x, y:y, r:r});
			}
		}
	}
	stepGrid = stepGrid.sort( function (a,b) { return (a.r - b.r); } );

	for (var x = -nearFieldGridRadius; x <= nearFieldGridRadius; x++) {
		for (var y = -nearFieldGridRadius; y <= nearFieldGridRadius; y++) {
			var r = Math.round(Math.sqrt(x*x + y*y)*100)/100;
			var a = Math.atan2(y,x);
			if (r <= nearFieldGridRadius) {
				nearFieldGrid.push({x:x, y:y, r:r, a:a});
			}
		}
	}
	nearFieldGrid = nearFieldGrid.sort( function (a,b) { return (a.r == b.r) ? (a.a - b.a) : (a.r - b.r);} );

	sessions.forEach(function (session) {
		session.startTime = session.startInt + (parseInt(session.date.substr(8,2),10)-5)*(24*60);
		session.endTime   = session.startTime + session.duration;
		session.stage     = (session.room.substr(0,5) == 'stage') ? parseInt(session.room.substr(6,1), 10) : undefined;
	})
}

function startPlay() {
	if (!interval) {
		interval = setInterval(update, frameDuration);
	}
	$('#play').removeClass('pause');
}

function stopPlay() {
	if (interval) {
		clearInterval(interval);
		interval = false;
	}
	$('#play').addClass('pause');
}

function togglePlay() {
	if (interval) stopPlay(); else startPlay();
}

function update() {
	if (mouseDrag) return;

	currentTime += timeStep;

	updateFrame();
}

var activeCount, activeSelectedCount;

function updateFrame() {
	if (currentTime > maxTime) {
		currentTime = maxTime;
		stopPlay();
	}

	if (currentTime < minTime) currentTime = minTime;

	updateData();
	updatePosition();
	renderInfos();
	renderCanvas();
}

function updateData() {
	activeCount = 0;
	activeSelectedCount = 0;

	data.matrix.forEach(function (times, index) {
		var timeId = time2index[Math.floor(currentTime)];

		var point = undefined;
		var pointBefore = undefined;
		
		var t0 = data.times[timeId];   if (isNaN(t0)) t0 = 0;
		var t1 = data.times[timeId+1]; if (isNaN(t1)) t1 = 1e10;
		
		var offset = (currentTime-t0)/(t1-t0);

		if (offset < random[index]) {
			pointBefore = times[timeId-2];
			point       = times[timeId-1];
		} else {
			pointBefore = times[timeId-1];
			point       = times[timeId];
		}

		if (!valid(pointBefore)) pointBefore = undefined;
		if (!valid(point)) point = undefined;

		var client = clients[index];
		if (client.point != point) {
			if (point !== undefined) {
				client.x0 = data.points[point].x*width;
				client.y0 = data.points[point].y*height;
				client.r0 = 1;
				if (client.point === undefined) client.x = undefined;
			} else {
				client.r0 = 0;
			}
			client.point = point;
			client.lastEvent = currentTime;
			client.settled = false;
		}

		if (mouseDrag) {
			client.x = undefined;
			client.settled = false;
		}

		if (client.point !== undefined) {
			activeCount++;
			if (client.selected) activeSelectedCount++;
		}
	});
}

function renderInfos() {
	var d = Math.floor(currentTime/1440);
	var h = Math.floor(currentTime/60) % 24;
	var m = Math.floor(currentTime) % 60;
	h = (h+100+'').substr(1);
	m = (m+100+'').substr(1);
	$('#timer').html('Tag '+d+' - '+h+':'+m);

	var text = 'Aktive MAC-Adressen: '+activeCount;
	if (selectedCount > 0) text += '<br><span style="color:#ee5000">Ausgewählte MAC-Adressen: '+activeSelectedCount+'</span>';
	$('#statistics').html(text);

	$('#sliderInner').css('left', -(currentTime-441));

	var stages = ['', '', '', '', '', '', '', ''];
	sessions.forEach(function (session) {
		if ((session.startTime <= currentTime) && (currentTime < session.endTime)) {
			if (session.stage !== undefined) {
				stages[session.stage] = 'Stage '+session.stage+': '+session.title;
			}
		}
	});
	for (var i = 1; i <= 7; i++) (function () {
		var node = $('#stage'+i);
		var oldText = node.attr('oldText');
		var newText = stages[i];
		node.attr('oldText', newText);

		if (oldText != newText) {
			if (mouseDrag) {
				node.html(newText);
			} else {
				node.stop(true);
				node.fadeOut(100, function () { node.html(newText); });
				node.fadeIn(100);
			}
		}
	})();
}

function updatePosition() {
	for (var x = -nearFieldGridRadius; x < width/gridSize + nearFieldGridRadius; x++) {
		for (var y = -nearFieldGridRadius; y < height/gridSize + nearFieldGridRadius; y++) {
			grid[x][y] = ((x >= 0) && (x < width/gridSize) && (y >= 0) && (y < height/gridSize));
		}
	}

	clients.forEach(function (client) {
		//client.r += (client.r0 - client.r)*decay;
		client.r = client.r0;
		
		client.valid = valid(client.point) || (client.r > 1e-2);

		if (client.settled) {
			var x = Math.round(client.x/gridSize);
			var y = Math.round(client.y/gridSize);
			if (grid[x][y]) {
				grid[x][y] = false;
				client.x = x*gridSize;
				client.y = y*gridSize;
			} else {
				client.settled = false;
			}
		}
	});

	clients.forEach(function (client) {
		if (!client.valid) return;

		client.xo = client.x;
		client.yo = client.y;

		var gridx0 = Math.round(client.x0/gridSize);
		var gridy0 = Math.round(client.y0/gridSize);

		if (client.x === undefined) {
			// Punkt ist neu, also finde einen neuen Ort zum settlen
			for (var i = 0; i < nearFieldGrid.length; i++) {
				var p = nearFieldGrid[i];
				if (grid[gridx0+p.x][gridy0+p.y]) {
					grid[gridx0+p.x][gridy0+p.y] = false;
					client.x = (gridx0+p.x)*gridSize;
					client.y = (gridy0+p.y)*gridSize;
					client.settled = true;
					break;
				}
			}
		} else {
			if (!client.settled) {
				// Kommt gerade von wo anders her

				// Mach mal einen Sprung nach vorn
				var xn, yn;
				var dx = (client.x0 - client.x);
				var dy = (client.y0 - client.y);
				var r = Math.sqrt(dx*dx + dy*dy);
				if (r > 1e-2) {
					var rn = Math.max(r-stepSize, 0);
					var f = 1-rn/r;

					client.x = client.x + (client.x0 - client.x)*f;
					client.y = client.y + (client.y0 - client.y)*f;
				} else {
					client.x = client.x0;
					client.y = client.y0;
				}

				// Bin ich schon da?
				var dx = (client.x0 - client.x);
				var dy = (client.y0 - client.y);
				var r = Math.sqrt(dx*dx + dy*dy);
				if (r < nearFieldRadius) {
					xn = Math.round(client.x/gridSize);
					yn = Math.round(client.y/gridSize);

					// Ist der neue Platz noch frei?
					if (grid[xn][yn]) {
						grid[xn][yn] = false;
						client.x = xn*gridSize;
						client.y = yn*gridSize;
					} else {
						var rMin = 1e10;
						var pMin = false;
						var gridx = Math.round(client.xo/gridSize);
						var gridy = Math.round(client.yo/gridSize);
						for (var i = 0; i < stepGrid.length; i++) {
							var p = stepGrid[i];
							if (grid[gridx+p.x][gridy+p.y]) {
								var dxn = client.x0 - (gridx + p.x)*gridSize;
								var dyn = client.y0 - (gridy + p.y)*gridSize;
								var rn = Math.sqrt(dxn*dxn + dyn*dyn);
								if (rn < rMin) {
									rMin = rn;
									pMin = p;
								}
							}
						}
						if (pMin) {
							grid[gridx+pMin.x][gridy+pMin.y] = false;
							client.x = (gridx + pMin.x)*gridSize;
							client.y = (gridy + pMin.y)*gridSize;
							client.settled = true;
						}
					}
				}
			}
		}
	});

	clients.forEach(function (client) {
		if (!client.valid) return;

		if (client.settled) {
			var gridx0 = Math.round(client.x0/gridSize);
			var gridy0 = Math.round(client.y0/gridSize);
			var gridx  = Math.round(client.x /gridSize);
			var gridy  = Math.round(client.y /gridSize);

			grid[gridx][gridy] = true;

			do {
				var dx = (gridx-gridx0);
				var dy = (gridy-gridy0);
				var rMin = dx*dx + dy*dy - 1e-5;
				var dxmin = 0;
				var dymin = 0;
				var foundBetter = false
				for (var dxg = -1; dxg <= 1; dxg++) {
					for (var dyg = -1; dyg <= 1; dyg++) {
						if (grid[gridx+dxg][gridy+dyg] && ((dxg != 0) || (dyg != 0))) {
							var dx = (gridx+dxg-gridx0);
							var dy = (gridy+dyg-gridy0);
							var r = dx*dx + dy*dy;
							if (r < rMin) {
								rMin = r;
								dxmin = dxg;
								dymin = dyg;
								foundBetter = true;
							}
						}
					}
				}
				if (foundBetter) {
					gridx += dxmin;
					gridy += dymin;
				}
			} while (foundBetter);
			grid[gridx][gridy] = false;
			client.x = gridx*gridSize;
			client.y = gridy*gridSize;
			//nachrücken
		}
	});
}

function renderCanvas() {
	context.clearRect(0, 0, width, height);

	var drawLists = [[],[],[],[]];
	clients.forEach(function (client) {
		if (client.valid) {
			var dx = client.x - client.xo;
			var dy = client.y - client.yo;
			var r = Math.sqrt(dx*dx + dy*dy);

			var f = (selectedCount > 0) ? (client.selected ? 1.3 : 0.4) : 1;

			if ((r > 1) && (!client.settled)) {
				if (client.selected) {
					drawLists[0].push(client);
				} else {
					drawLists[1].push(client);
				}
			} else {
				if (client.selected) {
					drawLists[2].push(client);
				} else {
					drawLists[3].push(client);
				}
			}
		}
	});

	context.strokeStyle = 'rgba(238,80,0,0.3)';
	context.lineWidth = 2*radius;
	context.beginPath();
	drawLists[0].forEach(function (client) {
		context.moveTo(client.xo, client.yo);
		context.lineTo(client.x,  client.y );
	})
	context.stroke();

	var a = (selectedCount > 0) ? 0.15 : 0.15;
	context.strokeStyle = 'rgba(0,0,0,'+a+')';
	context.lineWidth = 2*radius*((selectedCount > 0) ? 0.4 : 1);
	context.beginPath();
	drawLists[1].forEach(function (client) {
		context.moveTo(client.xo, client.yo);
		context.lineTo(client.x,  client.y );
	})
	context.stroke();

	context.fillStyle = 'rgb(238,80,0)';
	drawLists[2].forEach(function (client) {
		context.beginPath();
		context.arc(client.x, client.y, radius*1.3, 0, 2*Math.PI, false);
		context.fill();
	});

	var r = (selectedCount > 0) ? 0.4 : 1;
	context.fillStyle = 'rgb(0,0,0)';
	drawLists[3].forEach(function (client) {
		context.beginPath();
		context.arc(client.x, client.y, radius*r, 0, 2*Math.PI, false);
		context.fill();
	})

	if (mapDrag) {
		var x = Math.min(mouseDragX0, mouseDragX);
		var y = Math.min(mouseDragY0, mouseDragY);
		var w = Math.max(mouseDragX0, mouseDragX) - x;
		var h = Math.max(mouseDragY0, mouseDragY) - y;
		var p = $('#container').offset();
		x -= 0.5 + p.left;
		y -= 0.5 + p.top;

		context.fillStyle   = 'rgba(238,0,0,0.1)';
		context.strokeStyle = 'rgba(238,0,0,0.5)';
		context.lineWidth = 1;
		context.beginPath();
		context.rect(x, y, w, h);
		context.fill();
		context.stroke();
	}

	/*
	context.fillStyle = 'rgba(255,0,0,0.5)';
	for (var x = 0; x < width/gridSize; x++) {
		for (var y = 0; y < height/gridSize; y++) {
			if (!grid[x][y]) {
				context.beginPath();
				context.arc(x*gridSize, y*gridSize, 1, 0, 2*Math.PI, false);
				context.fill();
			}
		}
	}

	debugList.forEach(function (p) {
		context.beginPath();
		context.fillStyle = '#aaf';
		context.arc(p.xo, p.yo, 2, 0, 2*Math.PI, false);
		context.fill();

		context.beginPath();
		context.fillStyle = '#0f0';
		context.arc(p.x, p.y, 2, 0, 2*Math.PI, false);
		context.fill();
	});
	*/	
}

function valid(point) {
	return (point != null) && (point !== undefined);
}

