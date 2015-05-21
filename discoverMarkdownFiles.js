#!/usr/bin/node
if(!process.argv[2]) {
	console.log('Please pass a directory to the program to process!');
	process.exit(1);
}

var
	rootDir = process.argv[2],

	// Load Libs
	fs = require('fs'),
	path = require('path'),
	file = require('file'),
	stringify = require('json-stringify-safe'),

	finalJSON = {};

	// Functions
	arrayToNestedObject = function(obj, keyPath, value) {
		lastKeyIndex = keyPath.length-1;
		for (var i = 0; i < lastKeyIndex; ++ i) {
			key = keyPath[i];
			if (!(key in obj))
				obj[key] = {}
			obj = obj[key];
		}
		obj[keyPath[lastKeyIndex]] = value;
	},
	
	parseDB = function() {
		var timesRan = -1;
		var timesShouldRun = 0;

		file.walk(rootDir, function(err, dir, dirs, files) {
			timesRan++;
			timesShouldRun += dirs.length;

			for(foundFile in files) {
				if(path.extname(files[foundFile]) == '.md') {
					var fileAsArray = files[foundFile].split('/');
					arrayToNestedObject(finalJSON, fileAsArray, fs.readFileSync(files[foundFile], {encoding: 'utf-8'}));
				}
			}

			if(timesRan == timesShouldRun) {
				finalJSON = finalJSON.root;
				console.log(finalJSON.geo.notes['march18th.md']);

				fs.writeFileSync('db.json', stringify(finalJSON));
			}
		});
	};

fs.exists(rootDir, function(exists) {
	if(!exists) {
		console.log('Given directory doesn\'t seem to exist!');
		process.exit(1);
	} else {
		parseDB();
	}
});

