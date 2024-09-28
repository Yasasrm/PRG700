console.log('Module Example');

// Custom Modules or Local Modules
var calculator = require('./calc.js');

// Core Modules or Built-in Modules
const fs = require('fs');
const events = require('events');
const path = require('path');
const os = require('os');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const util = require('util');
const https = require('https');
const zlib = require('zlib');


// Util Module
// console.log(util)

// Calculator Module
console.log(calculator)
console.log(calculator.add(3, 2));
console.log(calculator.subtract(5, 2));
console.log(calculator.multiply(5, 2));
console.log(calculator.divide(10, 2));

// Global Objects
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
// console.log(process.env);
// console.log(console);

// setTimeout(() => {
//     console.log('Hello after 2 seconds');
// }, 2000);

// setInterval(() => {
//     console.log('Hello every 2 seconds');
// }, 2000)

// console.log(global)