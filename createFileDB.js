#!/usr/bin/node
if(!process.argv[2]) {
	console.log('Please pass a directory to the program to process!');
	process.exit();
}

var
		// VARIBLES //
	rootDir = process.argv[2],	// given directory to purge into for files

	finalJSON = {},							// JSON file in which to place dir/files and output at the end

		// LIBARIES //
	fs = require('fs'),													// for reading & writing markdown files
	path = require('path'),											// for extracting extensions from given files
	advfs = require('file'),										// for walking the root directory
	stringify = require('json-stringify-safe');	// for processing the 'finalJSON' varible to a string

		// FUNCTIONS //
	// Processing an array into a (possibly) nested thing within a object, and setting it
function setPropertyFromArray(obj, array, value) {
	for (var i=0;i<array.length-1;++i) {
		key = array[i];
		if (!(key in obj))
			obj[key] = {}
		obj = obj[key];
		}
	obj[array[array.length-1]] = value;
}

function parseGivenDir() {
	var timesRan = -1;			// track the number of times recursive function has ran
	var timesShouldRun = 0;	// 

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
			//console.log(finalJSON);

			fs.writeFileSync('schoolFiles.json', stringify(finalJSON));
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

