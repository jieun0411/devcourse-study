///// 연결 리스트 이용하여 큐 구현하기 /////

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // append와 비슷
  enqueue(newValue) {
    const newNode = new Node(newValue);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size += 1;
  }

  // pop과 비슷
  dequeue() {
    const value = this.head.value;
    this.head = this.head.next;
    this.size -= 1;
    return value;
  }

  // 현재 head값 반환
  peek() {
    return this.head.value;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);
console.log(queue.dequeue());
queue.enqueue(8);
console.log(queue.size);
console.log(queue.peek);
console.log(queue.dequeue());
console.log(queue.dequeue());
