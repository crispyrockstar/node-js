import fs from "fs";

console.time();
const fd = fs.openSync("16_numbers.txt", "w"); // open file in write mode

for (let i = 0; i < 100000; i++) {
  fs.writeSync(fd, `${i} `);
}

fs.closeSync(fd);
console.timeEnd();
console.log("File written successfully");
// Output: numbers to 1 lakh written in 16_numbers.txt file

//this is somewhat similar to streams
