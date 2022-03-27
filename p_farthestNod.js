//// [실습문제] 가장 먼 노드 ////
// 핵심 키워드 = 노드, 간선, 최단경로 ->뒷구르기 하면서 봐도 그래프 문제!
// 최단 경로가 제일 큰 경우의 집합을 구하는 문제

// BFS 구현 위한 큐 생성
class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }

  isEmpty() {
    return this.rear === this.front;
  }
}

function soluton(n, edge) {
  // 인접 리스트 이용
  // 1번부터 index시작, 초기 값으로 빈 배열 생성
  const graph = Array.from(Array(n + 1), () => []);

  for (const [src, dest] of edge) {
    graph[src].push(dest);
    graph[dest].push(src); // 양방향 구현
  } // 그래프 완성!

  const distance = Array(n + 1).fill(0); // 각 정점의 거리를 기록하기 위한 배열 생성, 0으로 초기화
  distance[1] = 1; // 첫 정점의 길이 1로 설정

  // BFS로직-너비우선 탐색(가까이 있는 것부터 순차적으로 탐색)
  const queue = new Queue();
  queue.enqueue(1);
  while (!queue.isEmpty()) {
    const src = queue.dequeue();
    // for of: 출발지에서 목적지까지의 요소들 뽑아준다.
    for (const dest of graph[src]) {
      // 한번도 가지 않은 경로는 0으로 초기화 되어있을 것이고
      if (distance[dest] === 0) {
        // 그 경로는 추가해준다.
        queue.enqueue(dest);
        // 도착지=출발지+1
        distance[dest] = distance[src] + 1;
      }
    }
  }
  console.log(distance);

  // 거리 중 최댓값
  const max = Math.max(...distance);
  // 최댓값 중 같은 값이 몇개나 있는지 필터링
  return distance.filter((item) => item === max).length;
}

// function solution(n, edge) {
//     let answer = 0;

//     const graph = Array.from(Array(n + 1), () => []);
//     const distance = Array(n + 1).fill(0);
//     const visited = Array(n + 1).fill(false);

//     for (const [a,b] of edge) {
//       graph[a].push(b);
//       graph[b].push(a);
//     }

//     const queue = [1];
//     visited[1] = true;

//     while (queue.length !== 0) {
//       now = queue.shift(); //shift는 O(n)이지만 요소가 적은 경우에는 JS엔진에서 최적화해준다.
//       graph[now].forEach((i) => {
//         if (!visited[i]) {
//           distance[i] = distance[now] + 1;
//           queue.push(i);
//           visited[i] = true;
//         }
//       });
//     }

//     const max = Math.max(...distance);
//     distance.forEach((dis) => {
//       if (dis === max) {
//         answer += 1;
//       }
//     });

//     return answer;
//   }
