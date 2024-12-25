//Duplex Streams
// a stream that can handle both read and write operations
// example: TCP socket in net module in node.js
//there will be two internal buffers
//one buffer for reading and one buffer for writing

//real example
//someone reading the data from a file and someone writing the data or other mode of data to another file

//Duplex streams are used when we want to read and write data at the same time

//transform streams
//what are transform streams?
//a type of duplex stream that can modify the data as it is written and read
//example: zlib.createGzip() and zlib.createGunzip() are transform streams
//zlib.createGzip() is used to compress the data and zlib.createGunzip() is used to decompress the data

//PassThrough streams
//a type of duplex stream that passes the data through without modifying it, it is a simple type of transform stream
//example: crypto.createCipher() and crypto.createDecipher() are PassThrough streams
//crypto.createCipher() is used to encrypt the data and crypto.createDecipher() is used to decrypt the data

import { Readable, Writable, Duplex } from "stream";
