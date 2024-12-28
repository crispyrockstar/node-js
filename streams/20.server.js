import http from "http";
import fs from "fs/promises";

const PORT = 4000;

const server = http.createServer(async (req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("Content-Type", "text/txt");

  const fileHandle = await fs.open("20_textToBrowser.txt");
  const readStream = fileHandle.createReadStream({ highWaterMark: 1 });

  readStream.on("data", (chunk) => {
    res.write(chunk);
    readStream.pause();
  });

  setInterval(() => {
    readStream.resume();
  }, 500);

  readStream.on("end", () => {
    res.end();
  });

  //   res.end("Hey response from server");
});

server.listen(PORT, () => {
  console.log("Server started on ", PORT);
});
