console.log("script loaded...");
console.log("Learning browser streams..");

const input = document.querySelector("input");
input.addEventListener("change", async () => {
  const file = input.files[0];

  //   console.log(file);

  // if user has selected a text file
  // then to watch the text content of selected file
  //   const str = await file.text();
  //   console.log(str);

  const readStream = file.stream(); //returns a readable stream

  //   const reader = readStream.getReader(); //reader function used to read the content

  //   const result = await reader.read(); //here read method will return the first chunk decided by browser not fixed as nodejs(64KiB)
  //   const decoder = new TextDecoder(); // textdecoder for  reading the Uint8Array buffer

  //   console.log(decoder.decode(result.value)); //returns an object

  //   //for text file
  //   //   result:
  //   // {done: false, value: Uint8Array(23893)}
  //   // we need to read again & again until done field get true

  //   const result2 = await reader.read();
  //   console.log(decoder.decode(result2.value));

  //   result2:
  //   {done: true, value: undefined}
  //now whole data has been read

  //lets optimize this little bit

  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) break;
  //     console.log(value);
  //   }

  //here we have a for await loop that can do same task with minimal efforts
  // we can read the data from readStream directly.

  for await (const chunk of readStream) {
    console.log(chunk);
  }
});
