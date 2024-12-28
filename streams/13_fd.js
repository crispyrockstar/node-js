import fs from "fs";

const fd = fs.openSync("12_text.txt"); //having content abcdef
// const fd = fs.openSync("13_fd.js"); //having content of this file

// console.log("fd: ", fd); //fd: 3

// fs.read(fd, (error, bytesRead, buffData) => {
//   console.error(error); // null
//   console.log("bytesRead: ", bytesRead); //bytesRead: 6
//   //   console.log("buffData: ", buffData); //buffData: <Buffer 61 62 63 64 65 66 00 00 00 ...>
//   console.log("buffDataString: ", buffData.toString()); //buffDataString: abcdef
// });

// here buffData is having 16KB by default, so it is showing some extra data but toString neglect the null

//here we can control the buffer size by passing the buffer size as 2nd argument
const buffDataSize = Buffer.alloc(3);
// fs.read(fd, buffDataSize, (error, bytesRead, buffData) => {
// //   console.error(error); // null
//   console.log("bytesRead: ", bytesRead); //bytesRead: 3
// //   console.log("buffData: ", buffData); //buffData: <Buffer 61 62 63>
//   console.log("buffDataString: ", buffData.toString()); //buffDataString: abc
// });

//for more options

fs.read(
  fd,
  {
    buffer: buffDataSize,
    position: 2, //it will discard the first 2 bytes
    length: 1, //it will read 1 bytes from position 2
    offset: 1, //it will start from 1st index of buffer
  },
  (error, bytesRead, buffData) => {
    console.log("bytesRead: ", bytesRead); //bytesRead: 1
    console.log("buffDataString: ", buffData.toString()); //buffDataString: c
  }
);
