import fs from "fs";

///incomplete
//when we are wring 1 lakh numbers in a file, it is taking 1.5 seconds
//this is because, we are writing each number one by one, which is taking time

// instead we can write the data to buffer(ram) and then write the buffer to file
// so that file writes will be less and total time will be less

console.time();
const buff = Buffer.allocUnsafe(4); // 4 bytes for each number

const fd = fs.openSync("17_numbers.txt", "w"); // open file in write mode

const totalBytesWrittenInBuffer = 0;
for (let i = 0; i < 10; i++) {
  //   fs.writeSync(fd, `${i} `);
  const bytesWritten = buff.write(`${i} `, totalBytesWrittenInBuffer);
  totalBytesWrittenInBuffer += bytesWritten;
  if (totalBytesWrittenInBuffer === buff.byteLength) {
    fs.writeSync(fd, buff);
    totalBytesWrittenInBuffer = 0;
  }
}

fs.closeSync(fd);
console.timeEnd();
console.log("File written successfully");
// Output: numbers to 1 lakh written in 16_numbers.txt file

//this is somewhat similar to streams
