//// [실습문제] 베스트 앨범 /////
// 알고리즘
// 1. 장르끼리 묶기
// 2. 묶인 노래들은 재생 순으로 정렬
// 3. 노래를 2개까지 자르는 작업
// 묶는 것, 정렬이 핵심
// 묶는다는 키워드가 나오면 해시 테이블과 연관 있을 가능성이 높다!

function solution(genres, plays) {
  const genreMap = new Map();

  genres
    .map((genre, index) => [genre, plays[index]]) // 장르와 인덱스를 묶어서, [장르, 재생횟수]형태의 배열로 만들기
    .forEach(([genre, play], index) => {
      const data = genreMap.get(genre) || { total: 0, songs: [] }; // [예외처리]첫번째 값이 없는 경우 고려
      genreMap.set(genre, {
        total: data.total + play, // 재생 횟수
        songs: [...data.songs, { play, index }]
          .sort((a, b) => b.play - a.play) // 내림차순 정렬
          .slice(0, 2), // 재생 순으로 2개까지
      });
    });

  return [...genreMap.entries()] // 장르맵을 빼온다. entries함수 사용, 그리고 배열로 만들어주기
    .sort((a, b) => b[1].total - a[1].total) // total순으로 정렬 [장르이름, 만든 데이터 담긴 object]
    .flatMap((item) => item[1].songs) // 노래 리스트를 하나의 배열로 만들기
    .map((song) => song.index); // index만 뽑기
}
