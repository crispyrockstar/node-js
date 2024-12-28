import http from "http";
import fs from "fs/promises";

const PORT = 4000;

const server = http.createServer(async (req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  //   res.setHeader("Content-Type", "text/plain"); // when whole data would be there then only it will be visible
  res.setHeader("Content-Type", "text/txt"); //data will be visible in client with time as it will reach
  //   res.setHeader("Content-Type", "video/mp4");
  //   res.setHeader("Content-Type", "video/mp4");
  //   res.setHeader("Content-Type", "video/mp4");

  //   const fileHandle = await fs.open("21_abc.txt");
  const fileHandle = await fs.open("..\\package.json");
  //   const fileHandle = await fs.open("21_abc.txt");
  //   const fileHandle = await fs.open("21_abc.txt");
  const readStream = fileHandle.createReadStream({ highWaterMark: 2 });

  readStream.on("data", (chunk) => {
    res.write(chunk);
    readStream.pause();
  });

  setInterval(() => {
    readStream.resume();
  }, 200);

  readStream.on("end", () => {
    res.end();
  });

  //   res.end("Hey response from server");
});

server.listen(PORT, () => {
  console.log("Server started on ", PORT);
});
