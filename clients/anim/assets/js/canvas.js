function Canvas(options) {
	var me = this;
	
	var imageNode = options.imageNode;
	var node = options.node;
	var nodeOverlay = options.nodeOverlay;
	
	var context = node[0].getContext("2d");
	var contextOverlay = nodeOverlay[0].getContext("2d");
	
	var data = options.data;
	var columns = options.columns;
	var rows = (data.length/columns);
	var thumbWidth = options.thumbWidth;
	var thumbHeight = options.thumbHeight;
	
	var width = thumbWidth*columns;
	var height = thumbHeight*rows;
	
	var projectX  = [];
	var projectY  = [];
	var deproject = [];
	
	var indexes = [];
	for (var i = 0; i < data.length; i++) {
		entry = data[i];
		entry.id = i;
		indexes[i] = { entry:entry, sortBy:i, id:i };
		
		var x = (i % columns);
		var y = Math.floor(i/columns);
			
		entry.oldPos = i;
		entry.newPos = i;
		entry.oldColor = [0,0,0,0];
		entry.newColor = [0,0,0,0];
		
		projectX[i] = x*thumbWidth;
		projectY[i] = y*thumbHeight;
		
		if (deproject[x] === undefined) deproject[x] = [];
		
		deproject[x][y] = i;
	}
	
	nodeOverlay.mouseenter(function (e) { me.toolTip.show(e.pageX, e.pageY) });
	nodeOverlay.mousemove( function (e) { me.toolTip.show(e.pageX, e.pageY) });
	nodeOverlay.mouseleave(function (e) { me.toolTip.hide() });
	nodeOverlay.click(function (e) {
		me.toolTip.showInfobox();
	});
	
	me.toolTip = new (function () {
		var me = this;
		var status = {};
		var markedEntry;
		
		var tooltip = $('#tooltip');
		var marker = $('#marker');
		var infobox = $('#infobox');
		var infoboxContent = $('#infoboxContent');
		
		$('#infobox .close').click(function () { infobox.hide() });
		
		me.hide = function () {
			if (status.shown) {
				tooltip.hide();
				marker.hide();
			}
			status.shown = false;
		}
		
		me.show = function (x, y) {
			if (!status.shown) {
				tooltip.show();
				marker.show();
			}
			status.shown = true;
			
			var offset = $('#gridCanvas').offset();
			x -= offset.left;
			y -= offset.top;
			
			var xi = clamp(Math.floor(x/thumbWidth ), 0, columns - 1);
			var yi = clamp(Math.floor(y/thumbHeight), 0, rows    - 1);
			var index = deproject[xi][yi];
			var id = index.id
			var entry = indexes[index].entry;
			var html = '<b>'+entry.title+'</b><br>'+entry.hint;
			var content = html+xi+'_'+yi;
			
			if (status.content != content) {
				tooltip.html(html);
				
				var tx = xi*thumbWidth;
				var ty = yi*thumbHeight;

				marker.css({
					left: tx-3,
					top:  ty-3
				});
				
				tx += thumbWidth/2 - tooltip.outerWidth()/2;
				if (tx < -5) tx = -5;

				if (ty + thumbHeight + 120 < node.innerHeight()) {
					tooltip.css({
						left: tx,
						top:  ty + thumbHeight + 3,
						bottom: 'auto'
					});
				} else {
					tooltip.css({
						left: tx,
						top:  'auto',
						bottom: node.innerHeight() - (ty - 3)
					});
				}
			}
			
			status.content = content;
			markedEntry = entry;
		}
		
		function replace(text, regexp, value) {
			value = value.replace(/%/g, '&#37;');
			return text.replace(regexp, value);
		}
		
		var highlightCountries = {
			// Deutschland
			'DE':4,
			// deutschsprachig
			'CH':3,'AT':3,
			// EU
			'FR':2,'BE':2,'BG':2,'DK':2,'EE':2,'FI':2,'GR':2,'IE':2,'IT':2,'LV':2,'LT':2,'LU':2,'MT':2,'NL':2,'PL':2,'PT':2,'RO':2,'SE':2,'SK':2,'SI':2,'ES':2,'CZ':2,'HU':2,'GB':2,'CY':2,
			// westliche Staaten
			'US':1
		};
		
		me.showInfobox = function () {
			infobox.show();
			
			var c = markedEntry.restrictionsAll;
			var countries = [];
			for (var i = 0; i < c.length; i++) {
				var countryName = countryCodes[c[i]];
				if (countryName === undefined) console.error('Unbekannter Code: '+c[i]);
				countryName = inEnglishPlease ? countryName.en : countryName.de;
				
				var style = 'color:#888';
				switch (highlightCountries[c[i]]) {
					case 1: break;
					case 2: break;
					case 3: style = ''; break; 
					case 4: style = 'font-weight:bold'; break;
				} 
				countries.push('<span title="'+countryName+'" style="'+style+'">'+c[i]+'</span>');
			}
			if (countries.length == 0) {
				countries = 'Keinem Land';
			} else {
				countries = countries.join(', ');
			}
			
			var html = infoboxTemplate;
			
			html = replace(html, /%title%/g,                   markedEntry.title);
			html = replace(html, /%published%/g,    formatDate(markedEntry.published));
			html = replace(html, /%url%/g,                     markedEntry.url);
			html = replace(html, /%author%/g,                  markedEntry.author);
			if (inEnglishPlease) {
				html = replace(html, /%restriction%/g,        (markedEntry.restrictedInDE > 1) ? 'Yes' : 'No');
				html = replace(html, /%reason%/g,              markedEntry.reasonEN);
			} else {
				html = replace(html, /%restriction%/g,        (markedEntry.restrictedInDE > 1) ? 'Ja' : 'Nein');
				html = replace(html, /%reason%/g,              markedEntry.reasonDE);
			}
			html = replace(html, /%restrictionCountries%/g,    countries);
			html = replace(html, /%rank%/g,      formatInteger(markedEntry.rank));
			html = replace(html, /%thumbnail%/g,               markedEntry.thumbnail);
			html = replace(html, /%rating%/g,     formatRating(markedEntry.rating));
			html = replace(html, /%viewCount%/g, formatInteger(markedEntry.viewCount));
			html = replace(html, /%category%/g,                markedEntry.category);
			
			if (!markedEntry.restrictedInDE > 1) html = replace(html, /%de%.*?%\/de%/g, '');
			
			html = replace(html, /%\/?de%/g, '');
			
			infoboxContent.html(html);
			$('#infoboxContent span').tooltip();
		}
	})();
	
	me.sort = function (options) {
		for (var i = 0; i < data.length; i++) {
			indexes[i].sortBy = options.callback(indexes[i].entry);
			indexes[i].oldIndex = i;
			indexes[i].entry.hint = options.hint(indexes[i].entry);
		}
		
		indexes.sort(function (a, b) {
			if (a.sortBy == b.sortBy) {
				return a.oldIndex - b.oldIndex;
			} else {
				return a.sortBy - b.sortBy;
			}
		});
		
		for (var i = 0; i < indexes.length; i++) {
			var entry = indexes[i].entry;
			var id = entry.id;
			var x = i % columns;
			var y = Math.floor(i/columns);
			
			entry.oldPos = entry.newPos;
			entry.newPos = i;
		}
		
	}
	
	var cHigh   = [237,  28,  36, 0.6];
	var cMiddle = [255, 255,  60, 0.6];
	var cLow    = [200, 255, 200, 0.8];
	
	var cHigh   = [180,  28,  36, 0.6];
	var cMiddle = [255, 142, 146, 0.6];
	var cLow    = [255, 255, 255, 0.8];

	me.flag = function (options) {
		var count = 0;
		for (var i = 0; i < indexes.length; i++) {
			var entry = indexes[i].entry;
			var flagged = options.callback(entry);
			var color;
			
			switch (flagged) {
				case 0.0: color = cLow;    break;
				case 0.5: color = cMiddle; break;
				case 1.0: color = cHigh;   break;
				default:
					var v = flagged*2;
					if (v > 1) {
						v -= 1;
						color = [
							cHigh[0]*v + (1-v)*cMiddle[0],
							cHigh[1]*v + (1-v)*cMiddle[1],
							cHigh[2]*v + (1-v)*cMiddle[2],
							cHigh[3]*v + (1-v)*cMiddle[3]
						]
					} else {
						color = [
							cMiddle[0]*v + (1-v)*cLow[0],
							cMiddle[1]*v + (1-v)*cLow[1],
							cMiddle[2]*v + (1-v)*cLow[2],
							cMiddle[3]*v + (1-v)*cLow[3]
						]
					}
			}
			
			if (flagged > 0.5) count++;
			
			entry.oldColor = entry.newColor;
			entry.newColor = color;
		}
		return count;
	}
	
	me.makeItSo = function () {
		var image = imageNode[0];

		var frame = 1;
		var frameNumber = 10;
		
		var interval = setInterval(function () {
			var a = frame/frameNumber;
			a = (1-Math.cos(a*Math.PI))/2;
			if (frame >= frameNumber) a = 1;

			context.fillStyle = '#FFF';
			context.fillRect(0,0,width,height);
			
			var order = [];
			
			for (var i = 0; i < indexes.length; i++) {
				var entry = indexes[i].entry;
				var id = entry.id;
				order[i] = {
					entry:entry,
					value:(1-a)*entry.oldColor[3] + a*entry.newColor[3] 
				}
			}
			
			order.sort(function (a,b) {
				if (a.value == b.value) {
					return a.newPos - b.newPos;
				} else {
					return a.value-b.value;
				}
			})
			
			
			for (var i = order.length-1; i >= 0; i--) {
				var entry = order[i].entry;
				var id = entry.id;
				
				var x0 = projectX[entry.oldPos];
				var y0 = projectY[entry.oldPos];
				var x1 = projectX[entry.newPos];
				var y1 = projectY[entry.newPos];
				
				var x = Math.round((1-a)*x0 + a*x1);
				var y = Math.round((1-a)*y0 + a*y1);
				
				context.drawImage(
					image,
					projectX[id],
					projectY[id],
					thumbWidth,
					thumbHeight,
					x,
					y,
					thumbWidth,
					thumbHeight
				);
				
				var color = [
					(1-a)*entry.oldColor[0] + a*entry.newColor[0],
					(1-a)*entry.oldColor[1] + a*entry.newColor[1],
					(1-a)*entry.oldColor[2] + a*entry.newColor[2],
					(1-a)*entry.oldColor[3] + a*entry.newColor[3] 
				];
			
				color = generateRGBA(color);

				context.fillStyle = color;
				context.fillRect(x, y, thumbWidth, thumbHeight);
				
			}
			
			if (frame >= frameNumber) {
				clearInterval(interval);
				for (var i = 0; i < indexes.length; i++) {
					indexes[i].entry.oldColor = indexes[i].entry.newColor;
					indexes[i].entry.oldPos   = indexes[i].entry.newPos;
				}
			}
			frame++; 
		}, 60);
	}
	
	me.makeItFast = function () {
		for (var i = 0; i < indexes.length; i++) {
			var entry = indexes[i].entry;
			var id = entry.id;
			
			var x = projectX[entry.newPos];
			var y = projectY[entry.newPos];			
			var color = generateRGBA(entry.newColor);

			context.fillStyle = color;
			context.fillRect(x, y, thumbWidth, thumbHeight);
		}
	}
	
	function generateRGBA(a) {
		return 'rgba('+Math.round(a[0])+','+Math.round(a[1])+','+Math.round(a[2])+','+Math.round(a[3]*100)/100+')';
	}
	
	function clamp(value, min, max) {
		if (value < min) value = min;
		if (value > max) value = max;
		return value; 
	}
	
	return me;
}
