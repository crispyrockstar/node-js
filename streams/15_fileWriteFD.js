import fs from "fs";

const fd = fs.openSync("15_file.txt", "w"); // open file in write mode

const buff = Buffer.from("content to write from fileWriteFD.js 😊");

// fs.write(fd, "content to write from fileWriteFD.js", (err, bytesWritten, writtenData) => {
fs.write(fd, buff, (err, bytesWritten, writtenData) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("bytesWritten: ", bytesWritten); //can differ from characters count, because of encoding size taken to store a character in multiple bytes
  //   console.log("writtenData: ", writtenData);
  console.log("writtenData: ", writtenData.toString());
});

const bytesWritten = fs.writeSync(
  fd,
  "content to write from fileWriteFD.js sync"
);

console.log(bytesWritten);
