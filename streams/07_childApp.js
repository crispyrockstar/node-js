// console.log("Child app is running");

import fs from "fs";

const readStream = fs.createReadStream("source.txt");

readStream.pipe(process.stdout);
