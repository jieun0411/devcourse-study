//// [실습문제] 프린터 ////

// 알고리즘
// front가 가장 높은 우선순위가 아니라면, dequeue하고 enqueue
// front가 가장 높은 우선순위라면, dequeue하고 count

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

function solution(priorities, location) {
  const queue = new Queue();
  for (let i = 0; i < priorities.length; i++) {
    queue.enqueue([priorities[i], i]); // 각 요소의 [우선순위, 인덱스]를 큐에 삽입
  }

  priorities.sort((a, b) => b - a); // 우선순위 알기 위해 내림차순으로 정렬

  let count = 0;
  while (queue.size > 0) {
    const curValue = queue.peek();
    if (curValue[0] < priorities[count]) {
      // 현재 요소의 우선순위 < 지금까지 수행한 우선순위
      queue.enqueue(queue.dequeue());
    } else {
      const value = queue.dequeue();
      count += 1;
      if (location === value[1]) {
        return count;
      }
    }
  }
  return count;
}

solution([2, 1, 3, 2], 2);
// function solution(priorities, location) {
//   const print = new Queue();
//   let answer = 0;

//   for (const cur of priorities) {
//     next = cur + 1;
//     for (const next of priorities) {
//       if (priorities[cur] < priorities[next]) {
//         print.dequeue();
//         print.enqueue(priorities[cur]);
//       } else {
//         print.dequeue();
//         answer++;
//         if (cur == location) {
//           console.log(answer);
//           return answer;
//         }
//       }
//     }
//   }
// }
