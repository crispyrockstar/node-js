import net from "node:net";

//server configuration to which you want to connect
const SERVER_IP = "0.0.0.0";
const SERVER_PORT = 4000;
const socket = net.createConnection({ host: SERVER_IP, port: SERVER_PORT });

socket.on("error", () => {
  socket.write("Server lost");
});

setInterval(() => {
  socket.write("Hi");
  //   socket.end();
}, 2000);

socket.on("data", (chunk) => {
  console.log("Response from server", chunk.toString());
});
