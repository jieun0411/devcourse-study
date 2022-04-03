// input 배열이나 노드 등의 값이 arr로 주어질때

/*

let visited = Array(arr.length).fill(false);

const queue = [];

queue.push(arr[0]);
visited[0] = true;

while(queue.length > 0){
	const shift = queue.shift();
    
    arr.forEach((item, index)=>{
    	if(visited[index]) return;
    	
    	if(문제 조건){
        	visited[index] = true;
            queue.push(item);
        }
    })
}

*/
