import * as dotenv from "dotenv";
dotenv.config();
const express = require("express");

import Connection from "./src/db/connect";
import { createTask } from "./src/util/Task";
import { workerPool } from "./src/pool/pool";
import { downloadFileChunks, getBucket } from "./src/db/gridfs";
import { createReadStream, createWriteStream, writeFile, writeFileSync } from "fs";
import { Request, Response } from "express";
import FfmpegCommand from "fluent-ffmpeg";
import { PassThrough } from "stream";
import { resolve } from "path";
import ffmpeg from "fluent-ffmpeg";


const app = express();
app.use(express.json());

const port = process.env.PORT;

if (!port) {
  throw new Error("Port is missing!")
}

function constructS3Url(filename: string) {
  return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${filename}`;
}

app.put("/process", async (req: Request, res: Response) => {
  const document: Record<string, any> = JSON.parse(req.body.document);
  const filename: string = req.body.filename;
  const url = constructS3Url(filename);

  console.log({ document, filename, url })

  const command = ffmpeg(url).toFormat('mp4').save('./test-output.mp4')
  
  return res.send("Success!")
})

app.get("/health", (req: Request, res: Response) => {
  res.send("Looks like we're still good!")
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})