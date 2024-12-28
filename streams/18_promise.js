import fs from "fs/promises";

const fileHandle = await fs.open("18_text.txt", "w+");

console.log("file opened", fileHandle);

// const { bytesRead, buffer } = await fileHandle.read({
//   buffer: Buffer.alloc(10),
//   offset: 0,
//   length: 8,
//   position: 0,
// });

// console.log("bytesRead", bytesRead);
// console.log("dataBuffer", buffer.toString());

const { bytesWritten, buffer: writtenBuffer } = await fileHandle.write(
  "Hi, I am writing this using promises",
  {
    // offset: 0,
    // length: 32,
    // position: 0,
  }
);

console.log("bytesWritten", bytesWritten);
console.log("writtenBuffer", writtenBuffer.toString());

await fileHandle.close(); // returns undefined in promise
