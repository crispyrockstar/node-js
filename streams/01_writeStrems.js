import fs from "fs";
const writeStream = fs.createWriteStream("file.txt");

writeStream.write("abc");
