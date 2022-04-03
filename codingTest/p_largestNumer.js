///// [실습문제] 가장 큰 수 /////

function solution(numbers) {
  let answer = numbers
    .map((n) => n + "") // 문자열로 바꾸기
    .sort((a, b) => b + a - (a + b))
    .join(""); // 내림차순 정렬, join(''): 배열을 문자열로 합치기

  if (parseInt(answer) === 0) answer = "0"; // [엣지케이스] 배열 요소가 모두 0인 경우
  return answer;
}
