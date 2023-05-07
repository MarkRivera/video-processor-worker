import { ObjectId } from "mongodb";
import { Task } from "./util/Task";
import { worker } from "workerpool";
import { workerPool } from "./pool/pool";
import { downloadFileChunks, getBucket } from "./db/gridfs";
import FfmpegCommand from "fluent-ffmpeg";
import { createReadStream, createWriteStream } from "fs";

async function process_video(task: Task) {
  console.log("Task received!", task)
  const id = task.id;
  const bucket = await getBucket();

  console.log({ task })
  const readStream = await downloadFileChunks(id, bucket);
  const writeStream = createWriteStream("./outputfile.mp4");
  // Create file in tmp folder
  for await (const chunk of readStream) {
    writeStream.write(chunk);
  }

  // const command = FfmpegCommand();

  // command
  //   .on('start', function (commandLine) {
  //     console.log("Spawned FFmpeg with command: ", commandLine)
  //   })
  //   .on('progress', function (progress) {
  //     console.log("Processing: ", progress.percent)
  //   })
  //   .on('error', function (err) {
  //     console.log('An error occurred: ' + err.message);
  //   })
  //   .on('end', function () {
  //     console.log('Processing finished !');
  //   })
  //   .saveToFile(`../tmp/${task.filename}`)

  return "Success!"
}

worker({
  process_video: process_video
})