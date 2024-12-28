import http from "http";
import fs from "fs/promises";

const PORT = 4000;

const server = http.createServer(async (req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  // res.setHeader("Content-Type", "text/txt");
  // res.setHeader("Content-Type", "image/jpg");
  res.setHeader("Content-Type", "video/mp4");
  //mkv gets downloaded
  //mp4 starts playing in browser, will get download option in controls

  //if want to start downloading directly then
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=newDownloadFileName.mp4"
  );

  // const fileHandle = await fs.open("20_textToBrowser.txt");
  // const fileHandle = await fs.open("..\\package.json");
  // const fileHandle = await fs.open("20_server.js");
  // const fileHandle = await fs.open("20_image.jpg");
  const fileHandle = await fs.open("..\\..\\song.mp4");

  //for size sending to ui, for downloading progress
  const { size } = await fileHandle.stat();

  res.setHeader("Content-Length", size);

  // const readStream = fileHandle.createReadStream({ highWaterMark: 1 }); // for text file
  // const readStream = fileHandle.createReadStream({ highWaterMark: 50 * 1024 }); //for image 50 kb
  const readStream = fileHandle.createReadStream({
    highWaterMark: 10 * 1024 * 1024,
  }); //for video 10MB

  readStream.on("data", (chunk) => {
    res.write(chunk);
    readStream.pause();

    setInterval(() => {
      readStream.resume();
    }, 1000);
  });

  readStream.on("end", () => {
    res.end();
  });

  //   res.end("Hey response from server");
});

server.listen(PORT, () => {
  console.log("Server started on", PORT);
});
