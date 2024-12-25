//Data streams

//standard input output streams
// ---standard input stream: connected to keyboard: readable duplex stream(generally readable)
// ----standard output stream: connected to monitor: writable duplex stream(generally writable)
// ----standard error stream: connected to monitor: writable duplex stream(generally writable)

//every process have 3 streams
//process.stdin : standard input stream: file descriptor 0
//process.stdout : standard output stream: file descriptor 1
//process.stderr : standard error stream: file descriptor 2

// console.log(process.stdin); //won't work in browser //won't allow to write to it
// console.log(process.stdout);
// console.log(process.stderr);

//for file descriptor
// console.log(process.stdin.fd); //0
// console.log(process.stdout.fd); //1
// console.log(process.stderr.fd); //2

// process.stdin.write("Hello\n"); //won't return anything

//these two are somewhat similar
// console.log("Hellon\n");
// process.stdout.write("Hello\n");

// process.stderr.write("Error\n");

import fs from "fs";
import { pipeline } from "stream";
//using stdin

// const writeStream = fs.createWriteStream("inputFromTerminal.txt");
// process.stdin.on("data", (data) => {
//   console.log("Data received: ", data.toString());
//   writeStream.write(data);
// });

//or using pipe
// process.stdin.pipe(writeStream);

//or using pipeline
// pipeline(process.stdin, writeStream, (err) => {
//   if (err) {
//     console.error("Pipeline failed", err);
//   } else {
//     console.log("Pipeline succeeded");
//   }
// });

//using stderr
// process.stderr.write("Error\n");

//understanding duplex streams
import { spawn } from "child_process";

// const childProcess = spawn("cat", ["source.txt"]);
// childProcess.stdout.on("data", (data) => {
//   console.log("Data from child process: ", data.toString());
// });

//now playing with some node app
const childProcess = spawn("node", ["07_childApp.js"]);
// childProcess.stdout.on("data", (data) => {
//   console.log("Data from child process: ", data.toString());
// });

//using pipe
childProcess.stdout.pipe(process.stdout);

//creating an app that will run a child app and child app will read a file write to stdout and parent app will read from child app and write to a file

const childProcess1 = spawn("node", ["07_childApp.js"]);

childProcess1.stdout.pipe(fs.createWriteStream("copyFileFromChild.txt"));
