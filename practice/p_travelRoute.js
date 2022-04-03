//// [실습문제] 여행 경로 ////

const tickets = [
  ["ICN", "JFK"],
  ["HND", "IAD"],
  ["JFK", "HND"],
];

function solution(tickets) {
  let answer = ["ICN"]; // 시작점 미리 초기화
  let visit = new Array(tickets.length).fill(0);

  tickets.sort();

  function dfs(str, index) {
    if (index === tickets.length) {
      return true;
    }

    for (let i = 0; i < tickets.length; i += 1) {
      if (visit[i] == 0 && tickets[i][0] == str) {
        visit[i] = 1;
        answer.push(tickets[i][1]);
        if (dfs(tickets[i][1], index + 1)) {
          return true;
        }
        visit[i] = 0;
        answer.pop();
      }
    }

    return false;
  }

  dfs("ICN", 0);

  return answer;
}

/*
solution(tickets);

let visit;
let answer;

const dfs = (tickets, start, res, cnt) => {
    res.push(start);
    
    if (cnt === tickets.length) {
        answer = res;
        return true;
    }
    
    for (let i=0; i<tickets.length; i++) {
        if (visit[i] === 0 && tickets[i][0] === start) {
            visit[i] = 1;
            
            const result = dfs(tickets, tickets[i][1], res, cnt + 1);
            
            if (result) return true;
            
            visit[i] = 0;
            res.pop();
        }
    }
    return false;
}

function solution(tickets) {
    const arr = [...tickets].sort();
    visit = new Array(tickets.length).fill(0);
    
    dfs(arr, 'ICN', [], 0);
    
    return answer;
}
*/
