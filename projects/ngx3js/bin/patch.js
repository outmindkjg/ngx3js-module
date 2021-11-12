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

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const question =
	'\n\nThis program will change some json file for ngx3js.\n\nDo you want to check out and modify ' +
	'angular.json'.red +
	' , ' +
	'package.json'.red +
	', ' +
	'tsconfig.json'.red +
	' files? (Y/N)';

rl.question(question, function (agree) {
	rl.close();
	switch (agree) {
		case 'YES':
		case 'Y':
		case 'Yes':
		case 'yes':
		case 'y':
			const packageJson = readJson('package');
			if (packageJson['dependencies'] === undefined) {
				packageJson['dependencies'] = {};
			}
			const dependencies = packageJson['dependencies'];
			dependencies['ammojs-typed'] = '^1.0.6';
			dependencies['chroma-js'] = '^2.1.2';
			dependencies['fs'] = '0.0.1-security';
			dependencies['fs-web'] = '^1.0.1';
			dependencies['gsap'] = '^3.8.0';
			dependencies['lil-gui'] = '^0.12.0';
			dependencies['three'] = '0.134.0';

			if (packageJson['devDependencies'] === undefined) {
				packageJson['devDependencies'] = {};
			}
			const devDependencies = packageJson['devDependencies'];
			devDependencies['@types/three'] = '0.134.0';
			devDependencies['@types/chroma-js'] = '^2.1.2';

			const tsconfigJson = readJson('tsconfig');
			if (tsconfigJson['compilerOptions'] === undefined) {
				tsconfigJson['compilerOptions'] = {};
			}
			const compilerOptions = tsconfigJson['compilerOptions'];
			if (compilerOptions['paths'] === undefined) {
				compilerOptions['paths'] = {};
			}
			const compilerOptionsPaths = compilerOptions['paths'];
			compilerOptionsPaths['fs'] = ['./node_modules/fs-web'];

			const angularJson = readJson('angular');

			const defaultProject = angularJson['defaultProject'];

			const projects = angularJson['projects'][defaultProject];
			if (projects['architect']['build']['options'] === undefined) {
				projects['architect']['build']['options'] = {};
			}
			const architectBuildOptions = projects['architect']['build']['options'];
			if (architectBuildOptions['allowedCommonJsDependencies'] === undefined) {
				architectBuildOptions['allowedCommonJsDependencies'] = [];
			}
			const allowedCommonJsDependencies =
				architectBuildOptions['allowedCommonJsDependencies'];
			if (allowedCommonJsDependencies.indexOf('ammojs-typed') === -1) {
				allowedCommonJsDependencies.push('ammojs-typed');
			}
			if (architectBuildOptions['assets'] === undefined) {
				architectBuildOptions['assets'] = [];
			}
			const assets = architectBuildOptions['assets'];
			let isAssetFounded = false;
			assets.forEach(function (assInfo) {
				if (typeof assInfo === 'string') {
					if (assInfo === './node_modules/ngx3js/assets') {
						isAssetFounded = true;
					}
				} else if (assInfo['input'] === './node_modules/ngx3js/assets') {
					isAssetFounded = true;
				}
			});
			if (!isAssetFounded) {
				assets.push({
					glob: '**/*',
					input: './node_modules/ngx3js/assets',
					output: '/assets/examples/',
				});
			}

			writeJson('package', packageJson, null, function () {
				console.log(
					'./package.json -- dependencies && devDependencies installed!\n'
				);
				writeJson(
					'./tsconfig',
					tsconfigJson,
					'To learn more about this file see: https://angular.io/config/tsconfig.',
					function () {
						console.log('./tsconfig.json -- compilerOptions installed!\n');
						writeJson('angular', angularJson, null, function () {
							console.log('auto run '+'npm install'.red +'!!!');
							exec("npm install", function(error, stdout, stderr) {
								if (error) {
									console.log(`error: ${error.message}`);
								}
								if (stderr) {
									console.log(`stderr: ${stderr}`);
								}
								if (stdout) {
									console.log(`stdout: ${stdout}`);
								}
								console.log(
									'./angular.json -- assets && allowedCommonJsDependencies installed!\n'
								);
								console.log(
									'RE RUN TO INSTALL "' + 'npm install'.red + '"' + ' in shell'
								);
								console.log(
									'RE RUN TO UPDATE "' + 'npm update'.red + '"' + ' in shell'
								);
								console.log('example - https://outmindkjg.github.io/ngx3js-doc/');
								console.log(
									'api doc - https://outmindkjg.github.io/ngx3js-doc/docs'
								);
								console.log(
									'git hub - https://github.com/outmindkjg/ngx3js-module'
								);
								console.log('npm - https://www.npmjs.com/package/ngx3js');
								console.log(
									'usage - https://github.com/outmindkjg/ngx3js-module#usage'
								);
								console.log('question - outmind0@gmail.com');
								console.log(
									'\n' + 'Thank You - Patch ' + 'Success'.green + '!.\n\n'
								);
							});
						});
					}
				);
			});
			break;
		default:
			console.log('usage - https://github.com/outmindkjg/ngx3js-module#usage');
			console.log('Read this page to use ngx3js');
			console.log('\n' + 'Thank You - Patch ' + 'Failed'.red + '!\n\n');
			break;
	}
});
