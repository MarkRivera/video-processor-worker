import { pool, worker, WorkerPool } from "workerpool";

class Pool {
  private pool: WorkerPool | null;

  constructor() {
    this.pool = null;
  }

  open() {
    if (this.pool) return this.pool;

    this.pool = pool("../process-chunk.ts", {
      minWorkers: "max",
    })

    return this.pool;
  }
}

const myPool = new Pool();
let workerPool = myPool.open()

export { workerPool }