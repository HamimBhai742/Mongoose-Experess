// console.log(process.argv);
const path = require('path');
const fs = require('fs');
const inputArguments = process.argv.slice(2);
const date=new Date().toLocaleString()
const message = `${inputArguments.join(' ')} ${date} \n`;

const filePath = path.join(__dirname, 'log.txt');
// console.log(filePath);

if (!message) {
  console.error('Provide message for log');
  process.exit(1);
}

fs.appendFile(filePath, message, { encoding: 'utf-8' }, () => {
  console.log("Message successfully append")
});
