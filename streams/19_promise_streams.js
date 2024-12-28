import fs from "fs/promises";

// first open the file which we want read or write

// const fileHandle = await fs.open("19_text.txt"); //read mode
// // const fileHandle = await fs.open("19_text.txt", "r+"); //read + write mode

// // create a readable stream from the file handle
// const readableStream = fileHandle.createReadStream();

// readableStream.setEncoding("utf-8");
// readableStream.on("data", (chunk) => {
//   console.log("chunk", chunk);
// });

// create a writable stream from the file handle
// const writableStream = fileHandle.createWriteStream();

// writableStream.write("Hi, I am writing this using streams");

//copy a file using streams
const sourceFileHandle = await fs.open("19_text.txt", "r+");

const destinationFile = await fs.open("19_text_copy.txt", "w");

const readStream = sourceFileHandle.createReadStream();

const writeStream = destinationFile.createWriteStream();

readStream.pipe(writeStream);

await sourceFileHandle.close();
await destinationFile.close();
