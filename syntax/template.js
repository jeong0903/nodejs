var name = '홍길동'
var letter = ' Dear ' + name + '\n \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, laboriosam. '+name+' Quae odit assumenda doloremque sint neque nisi in et impedit deleniti perspiciatis nam reiciendis tempore necessitatibus, ducimus earum animi quis. '+name;

var letter2 = `Dear ${name}

Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, laboriosam. ${name}, Quae odit assumenda doloremque sint neque nisi in et impedit deleniti perspiciatis nam reiciendis tempore necessitatibus, ducimus earum animi quis.${name}`;

console.log('');
console.log(letter);
console.log('');
console.log(letter2);