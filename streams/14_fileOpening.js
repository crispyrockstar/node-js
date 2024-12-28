// there are different modes to open a file using flags in fs.open/fs.openSync method
// r - read   default mode
// w - write
// a - append
// r+ - read and write  // it will not create a file if it is not there
// w+ - write and read  // it will create a file if it is not there
// a+ - append and read // it will create a file if it is not there
// rs - read in synchronous mode
// rs+ - read and write in synchronous mode
// ws - write in synchronous mode
// ws+ - write and read in synchronous mode
// as - append in synchronous mode
// as+ - append and read in synchronous mode

/*
 if a file has been in a read mode then it will not be able to write in that file


 */

import fs from "fs";

const fd = fs.openSync("14_text.txt");
// const fd = fs.openSync("14_text.txt", 'w'); // it will open the file in write mode and clear the content of the file if exist, if it is not there then it will create a new file
// const fd = fs.openSync("14_text.txt", 'a'); // it will open the file in append mode and preserve the content of the file if exist

fs.writeSync(fd, "Hello World");

//error
// node:fs:933
//   handleErrorFromBinding(ctx);
//   ^

// Error: EBADF: bad file descriptor, write

// by default the file is opened in read mode

//using third parameter of openSync method we can specify the mode of the file : file permissions
//  1 - means the file is readable
//  2 - means the file is writable
//  4 - means the file is open for read and write

// 777 - all permissions
// 666 - read and write permissions
// 444 - read only permissions
// 222 - write only permissions
