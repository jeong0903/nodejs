var args = process.argv;
console.log(args);
console.log('A');
console.log('B');
if (args[2] === 'jane') {
  console.log('C1');
}else {
  console.log('C2');
}
console.log('D');