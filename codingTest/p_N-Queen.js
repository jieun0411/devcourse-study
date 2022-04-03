///// [실습문제] N-Queen /////
/*
가지치기 할 수 있는 경우: 퀸을 둔 행, 열, 대각선 왼쪽, 대각선 오른쪽
하지만 가지치기 위해 행,열,대각선을 루프를 통해 검사하게 되면 성능 낭비 -> 최대한 적은 비용 위해 1차원 배열 사용
배열의 index : 행의 위치, 해당 index의 value : 열의 위치 
ex) queen[2]=1 은 두번째줄, 첫번째칸 (1부터 시작한다고 가정했을 때)

이러한 데이터 형태로의 조건
1. 한 index에 여러 value를 둘 수 없기 때문에 자연스럽게 가치지기 된다. (행 가지치기)
2. index가 같다면 둘 수 없다. 같다면 가지치기 한다. (열 가지치기)
3. 행, 열에 대한 차가 같다면 대각선에 있다는 뜻이므로 가지치기 한다. (대각선 가지치기)
    ex) 1부터 시작한다고 가정
            queen[3]=2, queen[1]=4 일때, 
            행에 대한 차 3-1과 열에 대한 차 4-2는 같기 때문에 대각선에 있다는 뜻이다. 
            (절대값으로 측정하면 왼쪽, 오른쪽 둘 다 체크 가능하다.)

결과적으로 재귀로 구현한 코드이다!
*/

function check(queen, row) {
  // 이전까지 두었던 퀸의 위치를 확인한다.
  for (let i = 0; i < row; i += 1) {
    // 행의 위치와 대각선의 위치를 체크한다.
    if (
      queen[i] === queen[row] ||
      Math.abs(queen[i] - queen[row]) === row - i
    ) {
      return false; // 둘 수 없다면 false
    }
  }

  return true; // 모두 통과되면 true
}

function search(queen, row) {
  const n = queen.length;
  let count = 0;

  if (n === row) {
    // 체스판 끝에 도달했다면..
    return 1; // 재귀의 탈출 조건
  }

  for (let col = 0; col < n; col += 1) {
    // 0부터 n까지 열을 돌면 둘 수 있게 만든다.
    queen[row] = col; // 우선 퀸을 둔다
    if (check(queen, row)) {
      // 퀸을 둘 수 있다면..
      count += search(queen, row + 1); // 다음 행으로 이동!
    }
  }

  return count;
}

function solution(n) {
  // 미리 n개 만큼의 배열을 초기화한다. 0번 행부터 시작한다.
  return search(
    Array.from({ length: n }, () => 0),
    0
  );
}
