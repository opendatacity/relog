var svg = '../sources/access points_redrawn-0.1.0-convert.svg';

var fs = require('fs');

svg = fs.readFileSync(svg, 'utf8');

var image = svg.match(/\<image.*?\>/g)[0];

var w = parseFloat(image.match(/width\=\"(.*?)\"/)[1]);
var h = parseFloat(image.match(/height\=\"(.*?)\"/)[1]);

var matrix = image.match(/matrix\((.*?)\)/)[1].split(' ');
matrix = matrix.map(function (v) { return parseFloat(v) });

var width = w*matrix[0] + h*matrix[1];
var height = w*matrix[2] + h*matrix[3];
var x0 = matrix[4];
var y0 = matrix[5];

svg = svg.split('\r\n');

var group = '';
var accesspoints = {};

svg.forEach(function (line) {
	if (line.match(/\<line id\=/) != null) {
		
		var id = line.match(/id\=\"(.*?)\"/)[1].toLowerCase();
		var x = parseFloat(line.match(/x1\=\"(.*?)\"/)[1]);
		var y = parseFloat(line.match(/y1\=\"(.*?)\"/)[1]);

		x = (x - x0)/width;
		y = (y - y0)/height;
		var x = Math.round(x*1e5)/1e5;
		var y = Math.round(y*1e5)/1e5;
		accesspoints[id] = {id:id, x:x, y:y, group:group}
	} else if (line.match(/\<g id\=/) != null) {
		group = line.match(/id\=\"(.*?)\"/)[1];
	} else if (line.match(/\<\/g\>/) != null) {
		group = '';
	}
	//console.log(line);
});

fs.writeFileSync('../cleaned/accesspoints.json', JSON.stringify(accesspoints, null, '\t'), 'utf8');
