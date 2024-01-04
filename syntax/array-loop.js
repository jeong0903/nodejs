var num = [1, 400, 12, 23, 5];
var i = 0;
var total = 0;
while(i < num.length){
  total = total + num[i];
  i = i + 1;
}
console.log(`total : ${total}`);