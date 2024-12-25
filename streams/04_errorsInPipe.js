import fs from "fs";
import { pipeline } from "stream";
console.time();
const readStream = fs.createReadStream("D:\\NodeJS\\source.mkv", {
  //setting 1 MB as the highWaterMark limit to read the data at once
  highWaterMark: 1 * 1024 * 1024,
});

const writeStream = fs.createWriteStream("destination.mkv");

//first way
readStream.pipe(writeStream);

//error handled second better way
pipeline(readStream, writeStream, (error) => {
  console.log("error", error);
});

//pipeline is a utility function to handle the multiple streams with error handling

//if need to stop the data transfer between two streams
// readStream.unpipe(writeStream);

// emulating the above line: stopping the data transfer after 1 second
setTimeout(() => {
  readStream.unpipe(writeStream);
}, 1000);

// if there is any error in the pipe, then app will crash
//there is no error handling
// we have to handle the error

//one way to handle the error on readStream
readStream.on("error", (error) => {
  console.log("error", error);
});

// second: in place of pipe we can use pipeline
// pipeline is a utility function to handle the errors
// it will handle the error and close the streams
