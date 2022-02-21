const fs = require('fs');
const _ = require('lodash');

const jsonData = fs.readFileSync(0, 'utf-8');
const data = JSON.parse(jsonData);

if(!data.length) throw new Error("No length for data")
const keys = Object.keys(data[0]).sort();
const newData = _.sortBy(data, keys)

console.log(JSON.stringify(newData, null, 2));
