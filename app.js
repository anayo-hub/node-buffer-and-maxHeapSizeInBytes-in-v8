// const buff = Buffer.alloc(12);

// console.log(buff);

// const v8 = require("v8");

// const maxHeapSizeInBytes = v8.getHeapStatistics().heap_size_limit;
// console.log("Max Heap Size:", maxHeapSizeInBytes, "bytes");

const fs = require("fs");

// Function to process data in smaller chunks
function processDataInChunks(chunk) {
  // In this example, we'll just convert the chunk to uppercase
  return chunk.toString().toUpperCase();
}

// Using streams to process data in smaller chunks and avoid excessive Buffers
function processFileWithStreams(inputFilePath, outputFilePath) {
  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);

  readStream.on("data", (chunk) => {
    const processedChunk = processDataInChunks(chunk);
    writeStream.write(processedChunk);
  });

  readStream.on("end", () => {
    writeStream.end();
    console.log("Data processing completed.");
  });

  readStream.on("error", (err) => {
    console.error("Error reading the file:", err);
  });
}

const inputFilePath = "large_input_file.txt";
const outputFilePath = "output.txt";

processFileWithStreams(inputFilePath, outputFilePath);
