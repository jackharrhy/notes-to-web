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

	// Varibles
	foundFiles = [],

	timesParsed = -1,
	parsesNeeded = 0,

	currentFile,
	finalJSON = {
		wot: {}
	},

	// Functions
	parseDB = function() {
		file.walk(rootDir, function(err, dir, dirs, files) {
			timesParsed++;
			parsesNeeded += dirs.length;

			for(foundFile in files) {
				if(path.extname(files[foundFile]) == '.md') {
					foundFiles.push(files[foundFile]);
				}
			}

			if(timesParsed == parsesNeeded) {
				sortFiles();
			}
		});
	},

	sortFiles = function() {
		for(markdownFile in foundFiles) {
			currentFile = foundFiles[markdownFile];

			if(currentFile == 0) {
				finalJSON[currentFile] = fs.readFileSync(currentFile, {encoding: 'utf-8'});
			} else {
				
			}
		}
		fs.writeFileSync('db.json', stringify(finalJSON));
	};

fs.exists(rootDir, function(exists) {
	if(!exists) {
		console.log('Given directory doesn\'t seem to exist!');
		process.exit(1);
	} else {
		parseDB();
	}
});

