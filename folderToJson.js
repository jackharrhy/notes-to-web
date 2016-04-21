#!/usr/bin/nodejs
if(!process.argv[3]) {
	console.log('Usage: Pass a directory and output file to the program\nBy default notes-to-json.js looks for output.json');
	process.exit();
}

var rootDir = process.argv[2];
var finalJSON = {};

var fs = require('fs');
var path = require('path');
var advfs = require('file');
var stringify = require('json-stringify-safe');
var tidyMarkdown = require('tidy-markdown');

function setPropertyFromArray(obj, array, value) {
	for (var i=0;i<array.length-1;++i) {
		key = array[i];
		if (!(key in obj))
			obj[key] = {}
		obj = obj[key];
	}
	obj[array[array.length-1]] = tidyMarkdown(value);
}

function parseGivenDir() {
	var timesRan = -1;
	var timesShouldRun = 0; 

	advfs.walk(rootDir, function(err, dir, dirs, files) {
		timesRan++;
		timesShouldRun += dirs.length;

		for(file in files) {
			if(path.extname(files[file]) == '.md') {
				var fileAsArray = files[file].split('/');
				fileAsArray[fileAsArray.length-1] = fileAsArray[fileAsArray.length-1].replace('.md', '');
				setPropertyFromArray(
					finalJSON,
					fileAsArray,
					fs.readFileSync(files[file], {encoding: 'utf-8'})
				);
			}
		}

		if(timesRan == timesShouldRun) {
			finalJSON = finalJSON[rootDir.replace('/', '')];

			fs.writeFileSync(process.argv[3], stringify(finalJSON));
		}
	});
};

fs.exists(rootDir, function(exists) {
	if(!exists) {
		console.log('Given directory doesn\'t seem to exist!');
		process.exit(1);
	} else {
		parseGivenDir();
	}
});
