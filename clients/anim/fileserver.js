var fs = require('fs');
var http = require('http');

http.createServer(function (request, response) {
	var buffer = '';
	request.on('data', function (data) { buffer += data });
	request.on('end', function () {
		buffer = JSON.parse(buffer);
		var filename = buffer.time;
		filename = './frames/svg2/'+filename.toFixed()+'.svg';
		var result = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="950px" height="475px" viewBox="0 0 950 475" enable-background="new 0 0 950 475" xml:space="preserve">'+buffer.svg+'</svg>';
		fs.writeFileSync(filename, result, 'utf8');
		console.log(filename);
		response.writeHead(200, {
			'Content-Type': 'text/html',
			'Access-Control-Allow-Origin' : '*'
		});
		response.end();
	})
}).listen(8888);


