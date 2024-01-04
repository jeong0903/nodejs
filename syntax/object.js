var members = ['A', 'B', 'C'];
console.log(members[1]);
var i = 0;
while (i<members.length) {
    console.log('array loop', members[i]);
    i++;
}

var roles = {
    'programmer':'pgm',
    'designer' : 'dsn',
    'manager' : 'mng'
}
console.log(roles.designer);
console.log(roles['designer']);

for(var name in roles){
    console.log('object =>', name, ' value =>', roles[name]);
}