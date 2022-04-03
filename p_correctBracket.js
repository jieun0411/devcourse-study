//// [실습문제] 올바른 괄호 ////

// 내 코드
function solution(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "(") {
      stack.push(s.charAt(i));
    } else {
      stack.pop();
    }
  }
  return stack.length === 0;
}

// 강사님 코드
function solution(s) {
  const stack = [];

  for (const c of s) {
    if (c === "(") {
      stack.push(c);
    } else {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}

// 강사님 코드 수정
function solution(s) {
  let count = 0;

  for (const c of s) {
    if (c === "(") {
      count += 1;
    } else {
      if (count === 0) {
        return false;
      }
      count -= 1;
    }
  }
  return count === 0;
}
