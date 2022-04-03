///// 최대 힙 구현 /////

class MaxHeap {
  constructor() {
    this.heap = [null]; // 0번 index는 비우기
  }

  // 힙 요소 추가
  push(value) {
    this.heap.push(value);
    let curIndex = this.heap.length - 1; // 힙의 가장 마지막에 요소 추가
    let parentIndex = Math.floor(curIndex / 2);

    // 부모 우선순위가 더 낮거나, 루트가 아닐 때까지 루프 돌리기
    while (parentIndex !== 0 && this.heap[parentIndex] < value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = value;
      this.heap[curIndex] = temp;

      curIndex = parentIndex;
      parentIndex = Math.floor(curIndex / 2);
    }
  }

  // 힙 요소 제거
  pop() {
    // 루트 요소를 반환하기 위해 임시로 상수에 저장
    const returnValue = this.heap[1];
    // 루트 정점을 가장 마지막 정점으로 대체
    this.heap[1] = this.heap.pop();

    // 루트로부터 아래로 내려가기 위한 변수 설정
    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;

    // 하위정점이 현재정점보다 우선순위 낮을 때 종료
    while (
      this.heap[currentIndex] < this.heap[leftIndex] ||
      this.heap[currentIndex] < this.heap[rightIndex]
    ) {
      // 왼쪽 정점보다 오른쪽 정점이 우선순위 더 높으면 바꾸기
      if (this.heap[leftIndex] < this.heap[rightIndex]) {
        const temp = this.heap[currentIndex];
        this.heap[currentIndex] = this.heap[rightIndex];
        this.heap[rightIndex] = temp;
        currentIndex = rightIndex;
        // 아님 왼쪽 정점과 바꾸기
      } else {
        const temp = this.heap[currentIndex];
        this.heap[currentIndex] = this.heap[leftIndex];
        this.heap[leftIndex] = temp;
        currentIndex = leftIndex;
      }
      // 다시 왼쪽, 오른쪽 정점 위치 구하기
      leftIndex = currentIndex * 2;
      rightIndex = currentIndex * 2 + 1;
    }
    return returnValue;
  }
}

const heap = new MaxHeap();
heap.push(3);
heap.push(1);
heap.push(4);
heap.push(2);
console.log(heap.heap);
const array = [];
array.push(heap.pop());
array.push(heap.pop());
array.push(heap.pop());
array.push(heap.pop());
console.log(array);
