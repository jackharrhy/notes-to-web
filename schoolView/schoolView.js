var
	props, prop,
	dirListing,

	json = null;

function getProperty(obj, path) {
	if(path == '') {
		dirListing = '';
		for(thing in obj) {
			dirListing += '+ ' + String(thing) + '\n\n';
		}
		return dirListing;
	}

	props = path.split('.');

	for(var i=0; i<props.length - 1; i++) {
		prop = props[i];
		obj = obj[prop];
	}

	foundProperty = obj[props[i]];
	console.log(foundProperty);

	if(typeof(foundProperty) == 'string') {
		return foundProperty;
	} else if(typeof(foundProperty) == 'object') {
		dirListing = '';
		for(thing in foundProperty) {
			dirListing += String(thing) + '\n\n';
		}
		return dirListing;
	} else {
		return 'Error';
	}
}

var output = document.getElementById('output');

function loadFileIntoDOM(fileAsString) {
	output.innerHTML = markdown.toHTML(getProperty(json, fileAsString));
}

var fileSelector = document.getElementById('fileSelector');

fileSelector.onkeypress = function(e) {
	if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
	if (keyCode == '13') {
		loadFileIntoDOM(fileSelector.value);
	}
}

// Load School Database
var
	xmlhttp = new XMLHttpRequest(),
	parser = new DOMParser();

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		json = JSON.parse(xmlhttp.responseText);
		loadFileIntoDOM('');
	}
}
xmlhttp.open("GET", 'schoolFiles.json', true);
xmlhttp.send();

