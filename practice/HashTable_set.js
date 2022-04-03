//// Set을 이용한 해시 테이블 구현 ////

const table = new Set();

table.add("key"); // key와 value가 동일하게 들어간다
table.add("key2");

// has
console.log(table.has("key")); // true
console.log(table.has("key3")); //false

// delete
table.delete("key2");
console.log(table.has("key2")); // false

// size
table.add("key3");
console.log(table.size); // 2

// clear
table.clear();
console.log(table.size); // 0
