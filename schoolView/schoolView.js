var
	xmlhttp = new XMLHttpRequest(),
	url = 'http://localhost:3000/db'
	parser = new DOMParser();

function handleJSON(json) {
	console.log(json);
	var htmlString = markdown.toHTML(json.geo.notes['march18th.md']);
	document.getElementById('root').innerHTML = htmlString;
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) { return pair[1]; }
	}
	return(false);
}

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var json = JSON.parse(xmlhttp.responseText);
		handleJSON(json);
	}
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

