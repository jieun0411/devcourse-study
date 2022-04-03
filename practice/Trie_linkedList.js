///// 연결리스트 이용하여 트라이 구현 /////

// 인접리스트 사용해서 구현
class Node {
  constructor(value = "") {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  //루트로 빈 노드 생성
  constructor() {
    this.root = new Node();
  }

  // 문자열 추가
  insert(string) {
    let curNode = this.root;

    // 문자열을 하나씩 자르며 순회
    for (const char of string) {
      // 간선에 없다면 새롭게 추가
      if (!curNode.children.has(char)) {
        curNode.children.set(char, new Node(curNode.value + char));
      }
      // 다음 정점으로 이동
      curNode = curNode.children.get(char);
    }
  }

  // 문자열 존재하는지 체크
  has(string) {
    let curNode = this.root;

    for (const char of string) {
      if (!curNode.children.has(char)) {
        return false;
      }
      curNode = curNode.children.get(char);
    }
    return true;
  }
}

const trie = new Trie();
trie.insert("cat");
trie.insert("can");
console.log(trie.has("cat"));
console.log(trie.has("can"));
console.log(trie.has("cap"));
