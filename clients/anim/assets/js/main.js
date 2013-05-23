
var countryCodes = {
	'AD':{de:'Andorra',en:'Andorra'},
	'AE':{de:'Vereinigte Arabische Emirate',en:'United Arab Emirates'},
	'AF':{de:'Afghanistan',en:'Afghanistan'},
	'AG':{de:'Antigua und Barbuda',en:'Antigua and Barbuda'},
	'AI':{de:'Anguilla',en:'Anguilla'},
	'AL':{de:'Albanien',en:'Albania'},
	'AM':{de:'Armenien',en:'Armenia'},
	'AO':{de:'Angola',en:'Angola'},
	'AQ':{de:'Antarktika',en:'Antarctica'},
	'AR':{de:'Argentinien',en:'Argentina'},
	'AS':{de:'Amerikanisch-Samoa',en:'American Samoa'},
	'AT':{de:'Österreich',en:'Austria'},
	'AU':{de:'Australien',en:'Australia'},
	'AW':{de:'Aruba',en:'Aruba'},
	'AX':{de:'Åland',en:'Åland Islands'},
	'AZ':{de:'Aserbaidschan',en:'Azerbaijan'},
	'BA':{de:'Bosnien und Herzegowina',en:'Bosnia and Herzegovina'},
	'BB':{de:'Barbados',en:'Barbados'},
	'BD':{de:'Bangladesch',en:'Bangladesh'},
	'BE':{de:'Belgien',en:'Belgium'},
	'BF':{de:'Burkina Faso',en:'Burkina Faso'},
	'BG':{de:'Bulgarien',en:'Bulgaria'},
	'BH':{de:'Bahrain',en:'Bahrain'},
	'BI':{de:'Burundi',en:'Burundi'},
	'BJ':{de:'Benin',en:'Benin'},
	'BL':{de:'Saint-Barthélemy',en:'Saint Barthélemy'},
	'BM':{de:'Bermuda',en:'Bermuda'},
	'BN':{de:'Brunei Darussalam',en:'Brunei Darussalam'},
	'BO':{de:'Bolivien',en:'Bolivia, Plurinational State of'},
	'BQ':{de:'Bonaire, Sint Eustatius und Saba (Niederlande)',en:'Bonaire, Sint Eustatius and Saba'},
	'BR':{de:'Brasilien',en:'Brazil'},
	'BS':{de:'Bahamas',en:'Bahamas'},
	'BT':{de:'Bhutan',en:'Bhutan'},
	'BV':{de:'Bouvetinsel',en:'Bouvet Island'},
	'BW':{de:'Botswana',en:'Botswana'},
	'BY':{de:'Belarus (Weißrussland)',en:'Belarus'},
	'BZ':{de:'Belize',en:'Belize'},
	'CA':{de:'Kanada',en:'Canada'},
	'CC':{de:'Kokosinseln',en:'Cocos (Keeling) Islands'},
	'CD':{de:'Kongo, Demokratische Republik (ehem. Zaire)',en:'Congo, the Democratic Republic of the'},
	'CF':{de:'Zentralafrikanische Republik',en:'Central African Republic'},
	'CG':{de:'Republik Kongo',en:'Congo'},
	'CH':{de:'Schweiz',en:'Switzerland'},
	'CI':{de:'Elfenbeinküste',en:'Côte d’Ivoire'},
	'CK':{de:'Cookinseln',en:'Cook Islands'},
	'CL':{de:'Chile',en:'Chile'},
	'CM':{de:'Kamerun',en:'Cameroon'},
	'CN':{de:'China, Volksrepublik',en:'China'},
	'CO':{de:'Kolumbien',en:'Colombia'},
	'CR':{de:'Costa Rica',en:'Costa Rica'},
	'CU':{de:'Kuba',en:'Cuba'},
	'CV':{de:'Kap Verde',en:'Cape Verde'},
	'CW':{de:'Curaçao',en:'Curaçao'},
	'CX':{de:'Weihnachtsinsel',en:'Christmas Island'},
	'CY':{de:'Zypern',en:'Cyprus'},
	'CZ':{de:'Tschechische Republik',en:'Czech Republic'},
	'DE':{de:'Deutschland',en:'Germany'},
	'DJ':{de:'Dschibuti',en:'Djibouti'},
	'DK':{de:'Dänemark',en:'Denmark'},
	'DM':{de:'Dominica',en:'Dominica'},
	'DO':{de:'Dominikanische Republik',en:'Dominican Republic'},
	'DZ':{de:'Algerien',en:'Algeria'},
	'EC':{de:'Ecuador',en:'Ecuador'},
	'EE':{de:'Estland',en:'Estonia'},
	'EG':{de:'Ägypten',en:'Egypt'},
	'EH':{de:'Westsahara',en:'Western Sahara'},
	'ER':{de:'Eritrea',en:'Eritrea'},
	'ES':{de:'Spanien',en:'Spain'},
	'ET':{de:'Äthiopien',en:'Ethiopia'},
	'FI':{de:'Finnland',en:'Finland'},
	'FJ':{de:'Fidschi',en:'Fiji'},
	'FK':{de:'Falklandinseln',en:'Falkland Islands (Malvinas)'},
	'FM':{de:'Mikronesien',en:'Micronesia, Federated States of'},
	'FO':{de:'Färöer',en:'Faroe Islands'},
	'FR':{de:'Frankreich',en:'France'},
	'GA':{de:'Gabun',en:'Gabon'},
	'GB':{de:'Vereinigtes Königreich Großbritannien und Nordirland',en:'United Kingdom'},
	'GD':{de:'Grenada',en:'Grenada'},
	'GE':{de:'Georgien',en:'Georgia'},
	'GF':{de:'Französisch-Guayana',en:'French Guiana'},
	'GG':{de:'Guernsey (Kanalinsel)',en:'Guernsey'},
	'GH':{de:'Ghana',en:'Ghana'},
	'GI':{de:'Gibraltar',en:'Gibraltar'},
	'GL':{de:'Grönland',en:'Greenland'},
	'GM':{de:'Gambia',en:'Gambia'},
	'GN':{de:'Guinea',en:'Guinea'},
	'GP':{de:'Guadeloupe',en:'Guadeloupe'},
	'GQ':{de:'Äquatorialguinea',en:'Equatorial Guinea'},
	'GR':{de:'Griechenland',en:'Greece'},
	'GS':{de:'Südgeorgien und die Südlichen Sandwichinseln',en:'South Georgia and the South Sandwich Islands'},
	'GT':{de:'Guatemala',en:'Guatemala'},
	'GU':{de:'Guam',en:'Guam'},
	'GW':{de:'Guinea-Bissau',en:'Guinea-Bissau'},
	'GY':{de:'Guyana',en:'Guyana'},
	'HK':{de:'Hongkong',en:'Hong Kong'},
	'HM':{de:'Heard und McDonaldinseln',en:'Heard Island and McDonald Islands'},
	'HN':{de:'Honduras',en:'Honduras'},
	'HR':{de:'Kroatien',en:'Croatia'},
	'HT':{de:'Haiti',en:'Haiti'},
	'HU':{de:'Ungarn',en:'Hungary'},
	'ID':{de:'Indonesien',en:'Indonesia'},
	'IE':{de:'Irland',en:'Ireland'},
	'IL':{de:'Israel',en:'Israel'},
	'IM':{de:'Insel Man',en:'Isle of Man'},
	'IN':{de:'Indien',en:'India'},
	'IO':{de:'Britisches Territorium im Indischen Ozean',en:'British Indian Ocean Territory'},
	'IQ':{de:'Irak',en:'Iraq'},
	'IR':{de:'Iran, Islamische Republik',en:'Iran, Islamic Republic of'},
	'IS':{de:'Island',en:'Iceland'},
	'IT':{de:'Italien',en:'Italy'},
	'JE':{de:'Jersey (Kanalinsel)',en:'Jersey'},
	'JM':{de:'Jamaika',en:'Jamaica'},
	'JO':{de:'Jordanien',en:'Jordan'},
	'JP':{de:'Japan',en:'Japan'},
	'KE':{de:'Kenia',en:'Kenya'},
	'KG':{de:'Kirgisistan',en:'Kyrgyzstan'},
	'KH':{de:'Kambodscha',en:'Cambodia'},
	'KI':{de:'Kiribati',en:'Kiribati'},
	'KM':{de:'Komoren',en:'Comoros'},
	'KN':{de:'St. Kitts und Nevis',en:'Saint Kitts and Nevis'},
	'KP':{de:'Korea, Demokratische Volksrepublik (Nordkorea)',en:'Korea, Democratic People’s Republic of'},
	'KR':{de:'Korea, Republik (Südkorea)',en:'Korea, Republic of'},
	'KW':{de:'Kuwait',en:'Kuwait'},
	'KY':{de:'Kaimaninseln',en:'Cayman Islands'},
	'KZ':{de:'Kasachstan',en:'Kazakhstan'},
	'LA':{de:'Laos, Demokratische Volksrepublik',en:'Lao People’s Democratic Republic'},
	'LB':{de:'Libanon',en:'Lebanon'},
	'LC':{de:'St. Lucia',en:'Saint Lucia'},
	'LI':{de:'Liechtenstein',en:'Liechtenstein'},
	'LK':{de:'Sri Lanka',en:'Sri Lanka'},
	'LR':{de:'Liberia',en:'Liberia'},
	'LS':{de:'Lesotho',en:'Lesotho'},
	'LT':{de:'Litauen',en:'Lithuania'},
	'LU':{de:'Luxemburg',en:'Luxembourg'},
	'LV':{de:'Lettland',en:'Latvia'},
	'LY':{de:'Libyen',en:'Libya'},
	'MA':{de:'Marokko',en:'Morocco'},
	'MC':{de:'Monaco',en:'Monaco'},
	'MD':{de:'Moldawien (Republik Moldau)',en:'Moldova, Republic of'},
	'ME':{de:'Montenegro',en:'Montenegro'},
	'MF':{de:'Saint-Martin (franz. Teil)',en:'Saint Martin (French part)'},
	'MG':{de:'Madagaskar',en:'Madagascar'},
	'MH':{de:'Marshallinseln',en:'Marshall Islands'},
	'MK':{de:'Mazedonien, ehem. jugoslawische Republik',en:'Macedonia, the former Yugoslav Republic of'},
	'ML':{de:'Mali',en:'Mali'},
	'MM':{de:'Myanmar (Burma)',en:'Myanmar'},
	'MN':{de:'Mongolei',en:'Mongolia'},
	'MO':{de:'Macao',en:'Macao'},
	'MP':{de:'Nördliche Marianen',en:'Northern Mariana Islands'},
	'MQ':{de:'Martinique',en:'Martinique'},
	'MR':{de:'Mauretanien',en:'Mauritania'},
	'MS':{de:'Montserrat',en:'Montserrat'},
	'MT':{de:'Malta',en:'Malta'},
	'MU':{de:'Mauritius',en:'Mauritius'},
	'MV':{de:'Malediven',en:'Maldives'},
	'MW':{de:'Malawi',en:'Malawi'},
	'MX':{de:'Mexiko',en:'Mexico'},
	'MY':{de:'Malaysia',en:'Malaysia'},
	'MZ':{de:'Mosambik',en:'Mozambique'},
	'NA':{de:'Namibia',en:'Namibia'},
	'NC':{de:'Neukaledonien',en:'New Caledonia'},
	'NE':{de:'Niger',en:'Niger'},
	'NF':{de:'Norfolkinsel',en:'Norfolk Island'},
	'NG':{de:'Nigeria',en:'Nigeria'},
	'NI':{de:'Nicaragua',en:'Nicaragua'},
	'NL':{de:'Niederlande',en:'Netherlands'},
	'NO':{de:'Norwegen',en:'Norway'},
	'NP':{de:'Nepal',en:'Nepal'},
	'NR':{de:'Nauru',en:'Nauru'},
	'NU':{de:'Niue',en:'Niue'},
	'NZ':{de:'Neuseeland',en:'New Zealand'},
	'OM':{de:'Oman',en:'Oman'},
	'PA':{de:'Panama',en:'Panama'},
	'PE':{de:'Peru',en:'Peru'},
	'PF':{de:'Französisch-Polynesien',en:'French Polynesia'},
	'PG':{de:'Papua-Neuguinea',en:'Papua New Guinea'},
	'PH':{de:'Philippinen',en:'Philippines'},
	'PK':{de:'Pakistan',en:'Pakistan'},
	'PL':{de:'Polen',en:'Poland'},
	'PM':{de:'Saint-Pierre und Miquelon',en:'Saint Pierre and Miquelon'},
	'PN':{de:'Pitcairninseln',en:'Pitcairn'},
	'PR':{de:'Puerto Rico',en:'Puerto Rico'},
	'PS':{de:'Palästinensische Autonomiegebiete',en:'Palestinian Territory, Occupied'},
	'PT':{de:'Portugal',en:'Portugal'},
	'PW':{de:'Palau',en:'Palau'},
	'PY':{de:'Paraguay',en:'Paraguay'},
	'QA':{de:'Katar',en:'Qatar'},
	'RE':{de:'Réunion',en:'Réunion'},
	'RO':{de:'Rumänien',en:'Romania'},
	'RS':{de:'Serbien',en:'Serbia'},
	'RU':{de:'Russische Föderation',en:'Russian Federation'},
	'RW':{de:'Ruanda',en:'Rwanda'},
	'SA':{de:'Saudi-Arabien',en:'Saudi Arabia'},
	'SB':{de:'Salomonen',en:'Solomon Islands'},
	'SC':{de:'Seychellen',en:'Seychelles'},
	'SD':{de:'Sudan',en:'Sudan'},
	'SE':{de:'Schweden',en:'Sweden'},
	'SG':{de:'Singapur',en:'Singapore'},
	'SH':{de:'St. Helena',en:'Saint Helena, Ascension and Tristan da Cunha'},
	'SI':{de:'Slowenien',en:'Slovenia'},
	'SJ':{de:'Svalbard und Jan Mayen',en:'Svalbard and Jan Mayen'},
	'SK':{de:'Slowakei',en:'Slovakia'},
	'SL':{de:'Sierra Leone',en:'Sierra Leone'},
	'SM':{de:'San Marino',en:'San Marino'},
	'SN':{de:'Senegal',en:'Senegal'},
	'SO':{de:'Somalia',en:'Somalia'},
	'SR':{de:'Suriname',en:'Suriname'},
	'SS':{de:'Südsudan',en:'South Sudan'},
	'ST':{de:'São Tomé und Príncipe',en:'Sao Tome and Principe'},
	'SV':{de:'El Salvador',en:'El Salvador'},
	'SX':{de:'Sint Maarten (niederl. Teil)',en:'Sint Maarten (Dutch part)'},
	'SY':{de:'Syrien, Arabische Republik',en:'Syrian Arab Republic'},
	'SZ':{de:'Swasiland',en:'Swaziland'},
	'TC':{de:'Turks- und Caicosinseln',en:'Turks and Caicos Islands'},
	'TD':{de:'Tschad',en:'Chad'},
	'TF':{de:'Französische Süd- und Antarktisgebiete',en:'French Southern Territories'},
	'TG':{de:'Togo',en:'Togo'},
	'TH':{de:'Thailand',en:'Thailand'},
	'TJ':{de:'Tadschikistan',en:'Tajikistan'},
	'TK':{de:'Tokelau',en:'Tokelau'},
	'TL':{de:'Osttimor (Timor-Leste)',en:'Timor-Leste'},
	'TM':{de:'Turkmenistan',en:'Turkmenistan'},
	'TN':{de:'Tunesien',en:'Tunisia'},
	'TO':{de:'Tonga',en:'Tonga'},
	'TR':{de:'Türkei',en:'Turkey'},
	'TT':{de:'Trinidad und Tobago',en:'Trinidad and Tobago'},
	'TV':{de:'Tuvalu',en:'Tuvalu'},
	'TW':{de:'Republik China (Taiwan)',en:'Taiwan, Province of China'},
	'TZ':{de:'Tansania, Vereinigte Republik',en:'Tanzania, United Republic of'},
	'UA':{de:'Ukraine',en:'Ukraine'},
	'UG':{de:'Uganda',en:'Uganda'},
	'UM':{de:'United States Minor Outlying Islands',en:'United States Minor Outlying Islands'},
	'US':{de:'Vereinigte Staaten von Amerika',en:'United States'},
	'UY':{de:'Uruguay',en:'Uruguay'},
	'UZ':{de:'Usbekistan',en:'Uzbekistan'},
	'VA':{de:'Vatikanstadt',en:'Holy See (Vatican City State)'},
	'VC':{de:'St. Vincent und die Grenadinen',en:'Saint Vincent and the Grenadines'},
	'VE':{de:'Venezuela',en:'Venezuela, Bolivarian Republic of'},
	'VG':{de:'Britische Jungferninseln',en:'Virgin Islands, British'},
	'VI':{de:'Amerikanische Jungferninseln',en:'Virgin Islands, U.S.'},
	'VN':{de:'Vietnam',en:'Viet Nam'},
	'VU':{de:'Vanuatu',en:'Vanuatu'},
	'WF':{de:'Wallis und Futuna',en:'Wallis and Futuna'},
	'WS':{de:'Samoa',en:'Samoa'},
	'YE':{de:'Jemen',en:'Yemen'},
	'YT':{de:'Mayotte',en:'Mayotte'},
	'ZA':{de:'Südafrika',en:'South Africa'},
	'ZM':{de:'Sambia',en:'Zambia'},
	'ZW':{de:'Simbabwe',en:'Zimbabwe'},
};

var canvas;
var sizeMode;
var thumbWidth, thumbHeight, columns, rows, imageUrl;

$(function () {
	for (var i = 0; i < data.length; i++) {
		var entry = data[i];

		entry.publishedTS = (new Date(entry.published)).getTime();
		entry.updatedTS   = (new Date(entry.updated  )).getTime();
		
		entry.restrictionCountries = {};
		for (var j = 0; j < entry.restrictionsAll.length; j++) {
			entry.restrictionCountries[entry.restrictionsAll[j]] = true;
		}
	}
		
	var width = $(window).width();

	     if (width < 520) sizeMode = 1;
	else if (width < 640) sizeMode = 0;
	else if (width < 860) sizeMode = 1;
	else sizeMode = 2;
	
	switch (sizeMode) {
		case 0: thumbWidth = 11; thumbHeight =  9; columns = 25; rows = 40; imageUrl = 'assets/img/grid_520.jpg'; break;
		case 1: thumbWidth = 16; thumbHeight = 12; columns = 25; rows = 40; imageUrl = 'assets/img/grid_640.jpg'; break;
		case 2: thumbWidth = 20; thumbHeight = 15; columns = 25; rows = 40; imageUrl = 'assets/img/grid_860.jpg'; break;
	}
	
	$('#gridImage').attr('src', imageUrl);
	$('#gridImage, #gridCanvas, #gridCanvasOverlay').attr({width: thumbWidth*columns, height: thumbHeight*rows});
	
	canvas = new Canvas({
		imageNode: $('#gridImage'),
		node: $('#gridCanvas'),
		nodeOverlay: $('#gridCanvasOverlay'),
		thumbWidth: thumbWidth,
		thumbHeight: thumbHeight,
		columns: columns,
		data: data
	});
	
	$('#gridFlag button').click(function (e) {
		updateCanvas({ flagType:$(e.target).attr('value') });
	})
	
	$('#gridSort button').click(function (e) {
		updateCanvas({ sortType:$(e.target).attr('value') });
	})
	
	updateCanvas({initialize:true});
});

function updateCanvas(options) {
	options = options || {};
	var flagType = options.flagType || $('#gridFlag .active').attr('value');
	var sortType = options.sortType || $('#gridSort .active').attr('value');
	
	var flag;
	var sort = function (entry) { return -entry.restrictedInDE };
	var hint;
	if (inEnglishPlease) {
		hint = function (entry) { return (entry.restrictedInDE > 1) ? 'Reason:<br><i>'+entry.reasonEN+'</i>' : '' };
	} else {
		hint = function (entry) { return (entry.restrictedInDE > 1) ? 'Begründung:<br><i>'+entry.reasonDE+'</i>' : '' };
	}
	
	switch (flagType.split('-')[0]) {
		case 'germany':
			flag = function (entry) { return [0,0,1.0,1.0,1.0][entry.restrictedInDE] };
			hint
		break;
		case 'gema':
			flag = function (entry) { return [0,0,1.0,0.2,0.2][entry.restrictedInDE] };
		break;
		case 'other':
			flag = function (entry) { return [0,0,0.2,1.0,1.0][entry.restrictedInDE] };
		break;
		case 'foreign':
			flag = function (entry) { return  (entry.restrictionsAll.length > ((entry.restrictedInDE > 1) ? 1 : 0)) ? 1 : 0 };
			sort = function (entry) {
				var inDE = (entry.restrictedInDE > 1) ? 1 : 0;
				var onlyForeign = entry.restrictionsAll.length - inDE;
				return -onlyForeign;
			};
			hint = function (entry) {
				if (entry.restrictedInDE > 1) {
					if (entry.restrictionsAll.length > 1) {
						if (entry.restrictionsAll.length > 2) {
							if (inEnglishPlease) {
								return 'blocked in '+(entry.restrictionsAll.length-1)+' countries<br>and in Germany';
							} else {
								return 'gesperrt in '+(entry.restrictionsAll.length-1)+' Ländern,<br>zusätzlich auch in Deutschland';
							}
						} else {
							var id = (entry.restrictionsAll[0] == 'DE') ? 1 : 0; 
							var code = countryCodes[entry.restrictionsAll[id]];
							if (inEnglishPlease) {
								return 'blocked in one country ('+code.en+')<br>and in Germany';
							} else {
								return 'gesperrt in einem Land ('+code.de+'),<br>zusätzlich auch in Deutschland';
							}
						}
					} else {
						if (inEnglishPlease) {
							return 'blocked only in Germany';
						} else {
							return 'gesperrt nur in Deutschland';
						}
					}
				} else {
					if (entry.restrictionsAll.length > 1) {

						if (inEnglishPlease) {
							return 'blocked in '+entry.restrictionsAll.length+' countries,<br>but not in Germany';
						} else {
							return 'gesperrt in '+entry.restrictionsAll.length+' Ländern,<br>aber nicht in Deutschland';
						}
					} else if (entry.restrictionsAll.length > 0) {
							var code = countryCodes[entry.restrictionsAll[0]];
							if (inEnglishPlease) {
								return 'blocked only in '+code.en;
							} else {
								return 'gesperrt nur in '+code.de;
							}
					} else {
						if (inEnglishPlease) {
							return 'nowhere blocked';
						} else {
							return 'nirgends gesperrt';
						}
					}
				}
			}
		break;
		case 'country':
			var country = flagType.split('-')[1];
			var code = countryCodes[country];
			flag = function (entry) { return  (entry.restrictionCountries[country] === true) ? 1 : 0 };
			sort = function (entry) { return -((entry.restrictionCountries[country] === true) ? 1000 : 0); };
			hint = function (entry) {
				if (entry.restrictionCountries[country] === true) {
					return inEnglishPlease ? 'blocked in '+code.en : 'gesperrt in &bdquo;'+code.de+'&rdquo;';
				} else {
					return '';
				}
			}
		break;
	}
	
	switch (sortType) {
		case 'rank':
			sort = function (entry) { return entry.rank	};
		break;
		case 'rating':
			sort = function (entry) { return -entry.rating	};
		break;
		case 'category':
			sort = function (entry) { return  entry.category.toLowerCase() };
		break;
	}
	
	canvas.sort({
		callback: sort,
		hint: hint
	});
	
	var value = canvas.flag({
		callback: flag
	});
	
	setCounter(value);
	
	if (options.initialize) {
		canvas.makeItFast();
	} else {
		canvas.makeItSo();
	}
}

var oldValue, newValue, counterInterval;
function setCounter(value) {
	function setValue(value) {
		value = (value/10).toFixed(1).replace(/\./, ',')+'%';
		if (value.length < 5) value = '&nbsp;&nbsp;'+value;
		$('#display-number-content').html(value);
	}
	if (oldValue === undefined) {
		setValue(value);
		oldValue = value;
	} else {
		clearInterval(counterInterval);
		(function () {
			var frame = 1;
			var frameNumber = 20;
			counterInterval = setInterval(
				function () {
					if (frame >= frameNumber) {
						setValue(value);
						oldValue = value;
						clearInterval(counterInterval);
					} else {
						var a = frame/frameNumber;
						a = (1-Math.cos(a*Math.PI))/2;
						var v = (1-a)*oldValue + a*value;
						setValue(v);
						frame++
					}
				}, 30
			);
		})();
	}
}

function formatRating(value) {
	return value.toFixed(2).replace(/\./, ',');
}

function formatInteger(value) {
	var t = value.toFixed(0);
	for (var i = t.length-3; i > 0; i -= 3) {
		t = t.substr(0, i) + '.' + t.substr(i); 
	}
	return t;
}

function formatDate(value) {
	value = new Date(value);
	var day   = value.getDate();
	var month = value.getMonth() + 1;
	var year  = value.getFullYear();
	return day + '.' + month + '.' + year;
}