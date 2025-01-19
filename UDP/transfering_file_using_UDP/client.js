import dgram from "node:dgram";
import fs from "node:fs";

//plan
/*
    create sockets in client and server 
    create a readStream in client and read the target file to send
    create a writeStream in server and write file in append mode 
    on complete of the file end the sockets
    for recognizing the end of the file we can send some identifier from client on end readStream and in server check for ending of file  
 */

// Define server address and port
const UDP_IP = "0.0.0.0";
const UDP_PORT = 4000;

// Create a UDP socket
const clientSocket = dgram.createSocket("udp4");

// readStream to send the file
const readStream = fs.createReadStream("D:\\NodeJS\\node-js\\01_sample.js", {
  highWaterMark: 1000,
});

//when data is there on readStream send to server socket
readStream.on("data", (chunk) => {
  clientSocket.send(chunk, UDP_PORT, UDP_IP);
});

//when readStream end, adding a identifier("EOF") to the flow
readStream.on("end", () => {
  clientSocket.send("EOF", UDP_PORT, UDP_IP, () => {
    console.log("File sent from client");
  });
});

clientSocket.on("message", (message, remote) => {
  console.log(
    `Response from server:
    message: ${message.toString()}
    from IP: ${remote.address}
         PORT: ${remote.port}`
  );
  clientSocket.close();
});
