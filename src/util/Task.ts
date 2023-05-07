
export type Task = {
  id: string;
  filename: string;
  task: string;
  totalChunks: number;
  chunkNumber: number;
}

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