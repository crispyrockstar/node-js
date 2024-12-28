import fs from "fs";

/*

    file descriptors are the non negative numbers which are getting assigned by os whenever we open a file.
    file descriptor is a reference to the file.

    most of the time it will start with 3.





*/

// fs.open("12_text.txt", "w", (err, fd) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("first file descriptor: ", fd);
//   }
// });

// output: 3

// fs.open("12_text2.txt", "w", (err, fd) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("second file descriptor: ", fd);
//   }
// });

// output: 4

// why file descriptors are starting with 3?
// 0 - stdin
// 1 - stdout
// 2 - stderr
// 3 - first file descriptor

console.log("Std in: ", process.stdin.fd); // 0

console.log("Std out: ", process.stdout.fd); // 1

console.log("Std err: ", process.stderr.fd); // 2
//output:
// Std in:  0
// Std out:  1
// Std err:  2
// first file descriptor:  3
// second file descriptor:  4

// to prevent call back

const fd1 = fs.openSync("12_text.txt");
const fd2 = fs.openSync("12_text2.txt");

console.log("fd1", fd1);
console.log("fd2", fd2);

// output:
// Std in:  0
// Std out:  1
// Std err:  2
// fd1 3
// fd2 4
