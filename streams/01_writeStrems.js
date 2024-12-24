import fs from "fs";
const writeStream = await fs.WriteStream("text.txt");

writeStream.write("hello");
