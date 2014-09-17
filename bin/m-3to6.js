#!/usr/bin/env node

var path = require('path');
var fs = require('fs');

var pkg;
var data;
var cortexjson = path.join(process.cwd(), 'cortex.json');

if (fs.existsSync(cortexjson)) {
  data = pkg = require(cortexjson);
}else  {
  cortexjson = path.join(process.cwd(), 'package.json');
  data = require(cortexjson);
  pkg = data.cortex;
}

if (pkg && pkg.devDependencies) { 
  if (pkg.devDependencies['neuron']) {
    delete pkg.devDependencies.neuron;
  }
}


if (pkg && pkg.directories && pkg.directories.css) {
  var css = pkg.directories.css;
  pkg.directories.src = css;
  if (!pkg.css) 
    pkg.css = path.join(css, '/*.css');
  delete pkg.directories.css;
}

fs.writeFileSync(cortexjson, JSON.stringify(data, null, 2), 'utf8');

console.log('done');
