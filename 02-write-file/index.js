// при завершении процесса посредством Ctrl+C или ввода exit созданный файл удаляется

const process = require('process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({input: process.stdin}); 
const writableStream = fs.createWriteStream(path.join(__dirname, '/text.txt'));

process.stdout.write('Hello! Please, enter text:\n');

rl.on('line', input => {
  if (input === 'exit') {
    rl.close();
  } else {
    writableStream.write(`${input}\n`);
  }
});

process.on('SIGINT', () => rl.close());
rl.on('close', () => {
  fs.unlink(path.join(__dirname, '/text.txt'), (err) => { if (err) throw err; });
  process.stdout.write('Bye!'); 
});
