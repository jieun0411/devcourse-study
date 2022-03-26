//// Map을 이용한 해시 테이블 구현 ////

const table = new Map();
table.set("key", 100);
table.set("key2", "Hello");
// map 사용방법: get
console.log(table["key"]); // undefined
console.log(table.get("key")); // 100

const object = { a: 1 };
table.set(object, "A1"); // Map은 Object도 Key로 쓸 수 있다
console.log(table.get(object)); //A1

// 삭제: delete
table.delete(object);
console.log(table.get(object)); //undefined

// keys, values
console.log(table.keys()); // {'key', 'key2'}
console.log(table.values()); // {100, 'Hello'}

// 모든 요소 제거: clear
table.clear();
console.log(table.values()); // { }
