//// [살습문제] 큰 수 만들기 ////
// 큰 값이 나오면 이전 값 중 더 작은 값은 전부 삭제한다.
// 스택의 바닥에서부터 탑은 큰 수부터 작은 수로 나열되어야 하는 것!

function solution(number, k) {
  const stack = [];
  let popCount = 0;

  for (const item of number) {
    while (count < k && stack[stack.length - 1] < item) {
      stack.pop();
      popCount += 1;
    }
    stack.push(item);
  }

  // [예외처리] 첫값이 가장 큰 경우 "987654"
  while (count < k) {
    stack.pop();
    popCount += 1;
  }
  return stack.join("");
}
