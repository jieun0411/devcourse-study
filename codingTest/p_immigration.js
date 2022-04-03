///// [실습문제] 입국 심사 /////
// 10억 이상의 제한사항->로그시간(이진탐색)
// times는 10만 이하->선형로그시간으로도 충분히 가능!

// 우리는 특정 값을 찾는 것이 아니다.
// 우리가 찾는 것은 최소 몇 분에 모든 심사가 끝나는 것인지.
// 이런 문제는 "결정 문제"라고 부른다. = 이진 탐색 = 파라메트릭 서치(Parametric Search)

// 답 : 최소 1분 ~ 최대 10억분*n명
// 면접관들이 몇 명을 처리하는가? : 처리 가능한 입국자 n보다 작으면 분을 올리고, 크다면 분을 낮춘다.
// 면접관이 시간대비 몇 명을 처리할 수 있는가? : 시간/심사시간=심사관 당 처리 가능한 입국자 수

function solution(n, times) {
  // 심사하는데 걸리는 시간을 이진 탐색을 이용하기 위해 정렬
  const sortedTimes = times.sort((a, b) => a - b); // O(n long n)
  let left = 1;
  let right = sortedTimes[sortedTimes.length - 1] * n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // sum(입국자수=시간/심사시간)
    const sum = times.reduce((acc, time) => acc + Math.floor(mid / time), 0);

    if (sum < n) {
      // 심사한 인원이 적음
      left = mid + 1;
    } else {
      // 심사한 인원이 초과되었으니 right(최대)-1
      right = mid - 1;
    }
  }

  return left;
}
