#!/usr/bin/env node
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 */

'use strict';

const colors = require('colors');
const readline = require('readline');
const { exec } = require("child_process");

// const prompt = require('prompt');
const fs = require('fs');
const cwd = process.cwd();

function readJson(fileName) {
	let rawdata = fs.readFileSync(cwd + '/' + fileName + '.json');
	rawdata = rawdata
		.toString()
		.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
			g ? '' : m
		);
	return JSON.parse(rawdata);
}

function writeJson(fileName, jsonData, comment, callBack) {
	let data = JSON.stringify(jsonData, null, 2);
	if (comment !== undefined && comment !== null && comment !== '') {
		data = '/** ' + comment + ' */\n' + data;
	}
	fs.writeFile(cwd + '/' + fileName + '.json', data, (err) => {
		if (err) throw err;
		console.log('Json file modified -> ' + (fileName + '.json').red);
		if (callBack !== undefined && callBack !== null) {
			callBack();
		}
	});
}

function readMd(fileName) {
	let rawdata = fs.readFileSync(cwd + '/' + fileName + '.md');
	return rawdata.toString();
}

function writeMd(fileName, text, callBack) {
	fs.writeFile(cwd + '/' + fileName + '.md', text, (err) => {
		if (err) throw err;
		console.log('Md file modified -> ' + (fileName + '.md').red);
		if (callBack !== undefined && callBack !== null) {
			callBack();
		}
	});
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function changePackage(orgPackage, tarPackage, callBack) {
	const packageJson1 = readJson(orgPackage + 'package');
	let readMe = readMd(orgPackage + 'README');
	const dependenciesThree = packageJson1['dependencies']['three'];
	const dependenciesThreeType = packageJson1['devDependencies']['@types/three'];
	const packageJson2 = readJson(tarPackage + 'package');
	packageJson2['version'] = packageJson1['version'];
	packageJson2['keywords'] = packageJson1['keywords'];
	packageJson2['license'] = packageJson1['license'];
	packageJson2['repository'] = packageJson1['repository'];
	packageJson2['description'] = packageJson1['description'];
	packageJson2['author'] = packageJson1['author'];
	packageJson2['bugs'] = packageJson1['bugs'];
	packageJson2['homepage'] = packageJson1['homepage'];
	readMe = readMe.replace(/ three@[0-9\.]+/g,' three@'+ dependenciesThree);
	readMe = readMe.replace(/ @types\/three@[0-9\.]+/g,' @types/three@'+ dependenciesThreeType);
	if (orgPackage == tarPackage) {
		writeMd(tarPackage + 'README', readMe, callBack);
	} else {
		writeJson(tarPackage  + 'package', packageJson2, '', function() {
			writeMd(tarPackage + 'README', readMe, callBack);
		});
	}
}

const question =
	'\n\nThis program will change Package file for ngx3js.\n\nDo you want to check out and modify ' +
	'package.json'.red + ' README.md'.red + ' files? (Y/N)';

rl.question(question, function (agree) {
	rl.close();
	switch (agree) {
		case 'YES':
		case 'Y':
		case 'Yes':
		case 'yes':
		case 'y':
			changePackage('projects/ngx3js/', 'projects/ngx3js/', function() {
				console.log('./projects/ngx3js/README.md -- changed!\n');
				changePackage('projects/ngx3js/', '', function() {
					console.log('./package.json ./README.md -- changed!\n');
					changePackage('projects/ngx3js/', 'projects/ngx3js-assets/', function() {
						console.log('./projects/ngx3js-assets/package.json ./projects/ngx3js-assets/README.md -- changed!\n');
						changePackage('projects/ngx3js/', '../ngx3js/', function() {
							console.log('../ngx3js/package.json ../ngx3js/README.md -- changed!\n');
						});
					});
				});
			});
			break;
		default:
			console.log('usage - https://github.com/outmindkjg/ngx3js-module#usage');
			console.log('Read this page to use ngx3js-module');
			console.log('\n' + 'Thank You - Patch ' + 'Failed'.red + '!\n\n');
			break;
	}
});
