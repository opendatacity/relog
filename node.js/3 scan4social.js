var fs = require('fs');

var data = fs.readFileSync('../cleaned/rp13-arr.json', 'utf8');
data = JSON.parse(data);

var points = [];
var addresses = {};

data.forEach(function (o) {
	var point = o[2]+o[0];
	var address = o[4];

	if (points[point] === undefined) points[point] = [];
	points[point].push(address);

	if (addresses[address] === undefined) addresses[address] = 0;
	addresses[address]++;
});

var addressList = [];
Object.keys(addresses).forEach(function (address) {
	if (addresses[address] > 100) addressList.push(address);
});
addresses = {};
addressList.forEach(function (address, index) {
	addresses[address] = index;
});

console.log(addressList.length);

var matrix = [];
var visible = [];
var n = 0;
for (var i = 0; i < addressList.length; i++) {
	matrix[i] = [];
	visible[i] = 0;
	for (var j = 0; j < addressList.length; j++) matrix[i][j] = 0;
}

Object.keys(points).forEach(function (point) {
	var subAddressList = points[point];
	var list = [];
	subAddressList.forEach(function (address) {
		if (addresses[address] !== undefined) list.push(addresses[address]);
	});

	for (var i = 0; i < list.length; i++) {
		var a = list[i];
		visible[a]++;
		for (var j = i+1; j < list.length; j++) {
			var b = list[j];
			matrix[a][b]++;
			matrix[b][a]++;
		}
	}

	n++;
});

var result = ['target\tsource\tweight'];
for (var i = 0; i < addressList.length; i++) {
	for (var j = i+1; j < addressList.length; j++) {
		var v = (matrix[i][j] - visible[i]*visible[j]/n)/n;
		v *= 20;
		if (v > 1e-2) {
			v = Math.pow(v, 0.5);
			result.push([i, j, v.toFixed(4)].join('\t'));
		}
	}
}

console.log(result.length);

fs.writeFileSync('./edges.tsv', result.join('\n'), 'utf8');

