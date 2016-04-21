var output = document.getElementById('output');

function display(key, string) {
	var h1 = document.createElement('h1');
	h1.setAttribute('class', 'seperator');
	h1.innerHTML = key;

	var p = document.createElement('p');
	p.innerHTML = markdown.toHTML(string);

	var div = document.createElement('div');
	div.appendChild(h1);
	div.appendChild(p);

	output.appendChild(div);
}

function load(obj) {
	output.innerHTML = '';

	recurse(obj);
}

function recurse(obj) {
	for(key in obj) {
		if(typeof(obj[key]) === 'object') {
			recurse(obj[key]);
		} else {
			display(key, obj[key]);
		}
	}
}

var xmlhttp = new XMLHttpRequest();
var parser = new DOMParser();
var json;

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		json = JSON.parse(xmlhttp.responseText);
		load(json);
	}
}
xmlhttp.open("GET", 'output.json', true);
xmlhttp.send();
