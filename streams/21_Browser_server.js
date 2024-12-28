const response = await fetch("http://localhost:4000");
// const data = await response.json(); //used for read the json data from browser stream it will be parsed when whole json data will arrive in the front-end
// we can send package.json for testing

//for text file streams
// console.log(response);
// const data = await response.text();
const decoder = new TextDecoder();
for await (const chunk of response.body) {
  console.log(decoder.decode(chunk)); //here browser optimizes the internal buffer size, if it gets the data in significant time then it will parse everything in single chunk or optimized chunks
}
console.log(data);
