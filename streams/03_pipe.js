import fs from "fs";
console.time();
const readStream = fs.createReadStream("D:\\NodeJS\\source.mkv", {
  //setting 1 MB as the highWaterMark limit to read the data at once
  highWaterMark: 1 * 1024 * 1024,
});

const writeStream = fs.createWriteStream("destination.mkv");

readStream.pipe(writeStream);
//below things are happening under the hood
// readStream.on("data", (chunk) => {
// const isEmpty = writeStream.write(chunk);
// //check if the write stream is full or not
// if (!isEmpty) {
//     // console.log("pausing to pass the data to write stream");
//     readStream.pause();
// }
// });

// writeStream.on("drain", () => {
// readStream.resume();
// //   console.log("now data is drained");
// });

//if need to stop the data transfer between two streams
// readStream.unpipe(writeStream);

// emulating the above line: stopping the data transfer after 1 second
setTimeout(() => {
  readStream.unpipe(writeStream);
}, 1000);

//ondoing the piping and unpiping pipe and unpipe events are triggered
writeStream.on("pipe", (src) => {
  console.log("pipe event is triggered");
});

writeStream.on("unpipe", (src) => {
  console.log("unpipe event is triggered");
});

writeStream.on("close", () => {
  console.log("file is closed");
});

writeStream.on("error", (error) => {
  console.log("error", error);
});

writeStream.on("finish", () => {
  console.log("write stream is finished");
});

readStream.on("end", () => {
  writeStream.end();
  console.log("file is copied");
  console.timeEnd();
});
// writeStream.end();
