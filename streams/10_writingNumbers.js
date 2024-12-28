import fs from "fs";

// console.time();
// for (let i = 1; i <= 5000; i++) {
//   fs.appendFileSync("10_numbers.txt", `${i} `);
// }

// console.timeEnd();
// time taken near by 2s

// now using streams

const writeStreams = fs.createWriteStream("10_numbers.txt");

console.time();
for (let i = 1; i <= 500000; i++) {
  writeStreams.write(`${i} `);
}
writeStreams.end();

// writeStreams.on("finish", () => {
// });
console.timeEnd();
// time taken near by 25ms
//streams are 60 to 70 times faster than normal file writing

// why streams are faster than normal file writing
