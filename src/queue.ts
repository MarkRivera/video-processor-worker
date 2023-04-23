
export type Task = {
  id: string;
  filename: string;
  task: string;
  totalChunks: number;
  chunkNumber: number;
}

interface IQueue<T> {
  enqueue(item: T): void;
  deque(): T | null;
  size(): number;
}

type QueueNode<T> = {
  message: T,
  next: QueueNode<T> | null;
}

class Queue<T> implements IQueue<T> {
  private front: QueueNode<T> | null;
  private back: QueueNode<T> | null;
  private capacity: number;
  private length: number;

  constructor(capacity: number = Infinity, front: QueueNode<T> | null = null, back: QueueNode<T> | null = null) {
    this.capacity = capacity;
    this.front = front;
    this.back = back;
    this.length = 0;
  }

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }

    let new_node = {
      message: item,
      next: null
    } as QueueNode<T>;

    this.length++;

    if (!this.front) {
      this.front = this.back = new_node
      return;
    }

    if (this.back) {
      this.back = new_node
      return;
    }
  }

  deque(): T | null {
    if (!this.front) {
      return null
    }

    if (this.length === 1) {
      let head = this.front;
      this.length--;
      this.front = this.back = null;

      return head.message;
    }

    this.length--;
    let head = this.front;
    this.front = this.front.next;
    return head.message;
  }
  size(): number {
    return this.length;
  }

  peek(): T | null {
    if (!this.front) {
      return null;
    }

    return this.front.message
  }
}

const queue = new Queue<Task>();

export { queue }