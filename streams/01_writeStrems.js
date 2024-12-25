import fs from "fs";
const writeStream = fs.createWriteStream("file.txt");

//write to the stream
writeStream.write("abc");

//always end the stream for telling the system that the stream is done
writeStream.end();

console.log("hi");
