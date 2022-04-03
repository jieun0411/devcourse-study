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
    // ----------map
    // 값(장르)와 인덱스를 인자로 받아 자동으로 for문을 돌려 값을 빼준다.
    // 따라서 장르와 인덱스를 묶어서, [장르, 재생횟수]형태의 배열을 반환한다.
    .map((genre, index) => [genre, plays[index]])
    // ----------forEach
    // forEach : 반환된 배열 요소 각각에 대해 주어진 함수 실행
    // `[장르 값, 인덱스에 맞는 play값], 처리할 현재 요소의 인덱스`를 인자로 넣어 함수 실행
    // 비구조화 할당 이용 // let [x,y]=[1,2], let {x,y}={x:1, y:2}
    .forEach(([genre, play], index) => {
      // ----------const data 선언
      // 생성한 genresMap에 key값으로 genre가 있을 경우 해당 값을 data에 저장
      // [예외처리] 없을 경우 (||) {total: 0, songs: []} 으로 해당 genre에 대한 값 초기화
      const data = genreMap.get(genre) || { total: 0, songs: [] };
      // ----------set
      // set : Map에서 값을 넣을 때 사용
      // Map의 key로 genre를 사용하며 후에 나오는 {} 안은 value
      genreMap.set(genre, {
        // value는 {total: (상수), songs: [...]의 객체 형태}
        total: data.total + play, // 재생 횟수
        // ----------songs의 내부 값
        // ...는 data(genresMap의 genre 키 값에 대한 value)를 전부 불러온다.
        // 기존에 기록되어 있는 값({total: ~, index: ~})들을 모두 불러와 뒤의 값을 덧붙힌다.
        songs: [...data.songs, { play, index }]
          .sort((a, b) => b.play - a.play) // play 값을 기준으로내림차순 정렬
          .slice(0, 2), // 재생 순으로 2개까지
      });
    });

  // -----------entries()
  // ...genresMap(genresMap 안에 있는 요소들 전부)를 키와 값 쌍으로 배열로 반환해준다.
  return (
    [...genreMap.entries()] // 장르맵을 빼온다. entries함수 사용, 그리고 배열로 만들어주기
      .sort((a, b) => b[1].total - a[1].total) // total 기준으로 내림차순 정렬 [장르이름, 만든 데이터 담긴 object]
      //----------flatMap
      // flat(): 플랫 함수는 중첩된 배열 구조를 정해진 깊이만큼 평탄하게 만들 수 있다. (default: 1)
      // faltMap()은 배열을 평탄화하는 flat기능에 각 요소에 접근하여 사용자 정의 로직을 수행할 수 있기 해준다.
      .flatMap((item) => item[1].songs) // 노래 리스트를 하나의 배열로 만들기
      // ----------map
      // song을 인자로 받아 자동으로 for문을 돌아 원하는 요소 반환 (song.index 반환)
      .map((song) => song.index)
  ); // index만 뽑기
}
