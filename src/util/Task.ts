import { ObjectId } from "mongodb";
import { queue } from "../queue";
import type { Task } from "../queue";

export function createTask(data: {
  id: string,
  filename: string,
  totalChunks: number,
  chunkNumber: number,
}): Task {
  const { id, filename, totalChunks, chunkNumber } = data;

  return {
    id,
    filename,
    task: "Change Resolution",
    totalChunks,
    chunkNumber
  }
}

export function enqueueTask(task: Task) {
  try {
    queue.enqueue(task)
    return console.log("Task Queued!")
  } catch (error) {
    if (error instanceof Error) throw new Error("Could not enqueue: " + error.message)
  }
}

export function dequeTask(): Task | null {
  return queue.deque()
}