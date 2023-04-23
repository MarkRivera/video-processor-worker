import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { ObjectId } from "mongodb";
import Connection from "./src/db/connect";
import { createTask, enqueueTask } from "./src/util/Task";
import { workerPool } from "./src/pool/pool";
import { Task } from "./src/queue";



const app = express();
app.use(express.json());

const port = process.env.PORT;

if (!port) {
  throw new Error("Port is missing!")
}

function taskFunc(task: Task) {
  let counter = 0;
  while (counter < 900000000) {
    counter++;
  }

  console.log({ task })
  return counter;
}

app.put("/process", async (req, res) => {
  const id = req.body.id as string;
  const filename = req.body.filename as string;

  if (!req.body.id) {
    return res.send("Id is missing, aborting video conversion")
  }

  // Grab video information
  const client = await Connection.open();
  const selectedDB = client.db("user-videos");
  let count = await selectedDB.collection("videos-bucket.chunks").countDocuments({
    files_id: new ObjectId(id)
  })

  // For each Chunk, create a task that a worker will process
  for (let i = 0; i < count; i++) {
    let task = createTask({
      id,
      filename,
      totalChunks: count,
      chunkNumber: i,
    })

    workerPool.exec(taskFunc, [task]);
  }
  // Once inserted, pass to worker to begin processing
  console.log(workerPool.stats())
  return res.send("Success!")
})

app.get("/health", (req, res) => {
  res.send("Looks like we're still good!")
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})