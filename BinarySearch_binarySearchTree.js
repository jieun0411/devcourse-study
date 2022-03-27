//// 이진 탐색 트리를 이용한 이진 탐색 구현 ////

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    // 루트가 비어있을 경우 삽입 값이 루트가 되고 종료
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let curNode = this.root;
    while (curNode !== null) {
      if (curNode.value < value) {
        if (curNode.right === null) {
          curNode.right = newNode;
          break;
        }
        curNode = curNode.right;
      } else {
        if (curNode.left === null) {
          curNode.left = newNode;
          break;
        }
        curNode = curNode.left;
      }
    }
  }

  has(value) {
    let curNode = this.root;
    while (curNode !== null) {
      if (curNode.value === value) {
        return true;
      }
      if (curNode.value < value) {
        curNode = curNode.right;
      } else {
        curNode = curNode.left;
      }
    }
    return false;
  }
}

const tree = new BinarySearchTree();
tree.insert(5);
tree.insert(4);
tree.insert(7);
tree.insert(8);
tree.insert(5);
tree.insert(6);
tree.insert(2);
console.log(tree.has(8)); // true
console.log(tree.has(1)); // false
