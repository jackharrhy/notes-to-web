var
	xmlhttp = new XMLHttpRequest(),
	url = 'db.json'
	parser = new DOMParser();

function getProperty(obj, path) {
	var
		props = path.split('.'),
		i = 0,
		prop;

	for(; i<props.length - 1; i++) {
		prop = props[i];
		obj = obj[prop];
	}

	return obj[props[i]];
}

function getQueryVariable(variable) {
	var
		query = window.location.search.substring(1),
		vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) { return pair[1]; }
	}
	return(false);
}

function handleJSON(json) {
	console.log(json);

	var htmlString = markdown.toHTML(
		getProperty(json, getQueryVariable('md'))
	);
	document.getElementById('root').innerHTML = htmlString;
}

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var json = JSON.parse(xmlhttp.responseText);
		handleJSON(json);
	}
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

