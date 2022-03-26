//// 배열을 이용한 이진 트리 구현 ////
// 0번 인덱스는 편의를 위해 비워둔다.
// Left = index * 2
// Right = index * 2 + 1
// Parent = floor(index / 2 )

const tree = [
  undefined,
  // 1
  9,
  // 1*2, 1*2+1
  3,
  8,
  // 2*2, 2*2+1, 3*2, 3*2+1
  2,
  5,
  undefined,
  7,
  // 4*2, 4*2+1, 5*2, 5*2+1
  undefined,
  undefined,
  undefined,
  4,
];
