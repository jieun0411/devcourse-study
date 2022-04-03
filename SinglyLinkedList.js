//// 단일 연결 리스트 구현 ////

// 노드 생성자
class Node {
  constructor(value) {
    this.value = value; // 데이터
    this.next = null; // 포인터
  }
}

// 연결 리스트 생성자
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // 탐색
  find(value) {
    let currNode = this.head;
    while (currNode.value !== value) {
      currNode = currNode.next;
      // [예외처리] 무한루프 방지
      if (currNode === null) break;
    }

    // [예외처리] 다음 노드가 null인 경우
    if (currNode === null) {
      return "찾는 값이 없습니다.";
    } else {
      return currNode;
    }
  }

  // 추가(끝부분에)
  append(newValue) {
    const newNode = new Node(newValue);
    if (this.head === null) {
      // 노드에 아무 값도 없는 경우
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode; // 새 노드로 연결을 옮겨주는 코드(포인터 역할!)
      this.tail = newNode; // tail에 새 노드 대입 // this.tail = this.tail.next;
    }
  }

  // 추가(원하는 위치에)(node 다음에)
  insert(node, newValue) {
    if (node === null) return; // [예외처리]
    const newNode = new Node(newValue);

    // [예외처리] 삽입 위치가 마지막 노드이면, tail 포인터 옮겨줘야 한다.
    if (node.next === null) tail = newNode;

    newNode.next = node.next; // 포인터 바꿔치기
    node.next = newNode; // 포인터 연결
  }

  // 삭제(값을 찾은 후 제거)
  remove(value) {
    let prevNode = this.head;

    // [예외처리] 첫번째 노드가 삭제할 값일때
    if (prevNode.value === value) {
      this.head = this.head.next;
      return;
    } else {
      // [예외처리] 노드가 1개 뿐인데 삭제할 노드가 없을 때
      if (prevNode.next === null) {
        prevNode = prevNode.next;
        return;
      }
      while (prevNode.next.value !== value) {
        prevNode = prevNode.next;
        // [예외처리] 무한루프 방지
        if (prevNode.next === null) {
          prevNode = prevNode.next;
          break;
        }
      }
    }
    if (prevNode.next !== null) {
      prevNode.next = prevNode.next.next;
    }
  }

  // 리스트 크기 구하는 메소드
  size() {
    let curNode = this.head;
    let len = 0;
    while (curNode !== null) {
      len += 1;
      curNode = curNode.next;
    }
    console.log(len);
  }

  // 출력
  display() {
    let currNode = this.head;
    let displayString = "[";
    while (currNode !== null) {
      displayString += `${currNode.value}, `;
      currNode = currNode.next;
    }
    displayString = displayString.substr(0, displayString.length - 2);

    // [예외처리] 비어있는 배열 출력 시 '['가 생략되는 이슈
    if (displayString === "") {
      displayString += "[";
    }

    displayString += "]";
    console.log(displayString);
  }
}

// 실행
const linkedList = new SinglyLinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.display();
console.log(linkedList.find(3));
linkedList.remove(3);
linkedList.display();
linkedList.insert(linkedList.find(2), 10);
linkedList.display();
