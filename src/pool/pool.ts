import { pool, WorkerPool } from "workerpool";

class Pool {
  private pool: WorkerPool | null;

  constructor() {
    this.pool = null;
  }

  open() {
    if (this.pool) return this.pool;

    this.pool = pool({
      minWorkers: "max",
    })

    return this.pool;
  }
}

let workerPool = new Pool().open()

export { workerPool }