import fs from "fs";
console.time();
const readStream = fs.createReadStream("D:\\NodeJS\\source.mkv", {
  //setting 1 MB as the highWaterMark limit to read the data at once
  highWaterMark: 1 * 1024 * 1024,
});

const writeStream = fs.createWriteStream("destination.mkv");

readStream.on("data", (chunk) => {
  const isEmpty = writeStream.write(chunk);
  //check if the write stream is full or not
  if (!isEmpty) {
    // console.log("pausing to pass the data to write stream");
    readStream.pause();
  }
});

writeStream.on("drain", () => {
  readStream.resume();
  //   console.log("now data is drained");
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
