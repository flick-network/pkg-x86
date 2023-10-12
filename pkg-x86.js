#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');
const minimist = require('minimist');
const path = require('path');
const semver = require('semver');

const args = minimist(process.argv.slice(2));
const entryPoint = args.i || 'index.js';
const outputFileName = args.o || 'output.exe';

if (!args.i) {
    console.error('The -i option for specifying the entry point of your project is mandatory.');
    process.exit(1); // Exit the script with an error code
  }

// Path to the  bundled Node.js binary
const bundledNodeBinaryPath = path.resolve(__dirname, 'node_modules/node/bin/node');

// Path to the bundled pkg binary
const pkgBinaryPath = path.resolve(__dirname, 'node_modules/pkg/bin/pkg.js');

function checkNodeVersion() {
  try {
    // Check the installed Node.js version
    console.log('Checking for the Node versions available in your system.');
    console.log('---------------------------------------------------------');
    const installedNodeVersion = execSync('node -v', { encoding: 'utf8' }).trim();
    
    // Compare the installed version with Node.js version 14
    if (semver.satisfies(installedNodeVersion, '14.x')) {
      return 'system'; // Use the system Node.js version
    }
  } catch (error) {
    // The 'node -v' command failed, indicating Node.js is not installed or not functioning properly.
  }

  return 'bundled'; // Use the bundled Node.js version
}

function downloadAndRunWithNode14() {
  const nodeVersionToUse = checkNodeVersion();
  
  if (nodeVersionToUse === 'system') {
    console.log('Perfect, Using system Node.js version itself.');
    console.log('---------------------------------------------------------');
  } else {
    console.log('Using bundled Node.js 14, since it only allows the x86 packaging.');
    console.log('---------------------------------------------------------');
    const nodeBinaryPath = nodeVersionToUse === 'system' ? 'node' : bundledNodeBinaryPath;

    // Check for unsupported modules and log errors
    try {
    const result = execSync(`${nodeBinaryPath} ${entryPoint}`, { encoding: 'utf8', stdio: 'pipe' });
    if (result.includes('Error') || result.includes('UnhandledException')) {
        console.log('Errors found when compiling your app code with Node.js 14:');
        console.log('Errors listed below: ');
        console.log(result);
        console.log('---------------------------------------------------------');
        console.log('---------------------------------------------------------');
        console.log('NOTE: Fix all these dependency and package issues so that you can generate a x86 app.');
        console.log('NOTE: The import errors need to be treated in a way that, the functions and packages used should be compatible with Node 14');
        console.log('NOTE: Hopefully, once you make changes like using "crypto-js" instead of "crypto" module [which is inbuilt for node 15 and above], this errors should vanish.');
    } else {
        console.log('Your code is ready to be packaged with pkg');
        // Package the entry point using the locally installed pkg
        execSync(`${pkgBinaryPath} ${entryPoint} -t node14-win-x86 -o ${outputFileName}`);
    }
    } catch (error) {
    console.error('Error occurred while checking with Node.js 14:', error.message);
    }
  }
}

downloadAndRunWithNode14();
