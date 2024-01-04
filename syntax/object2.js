// array, object

function f1() {
    console.log(1+1);
    console.log(2+2);
}

console.log(f1);
f1();

// var i = if(true){console.log('1');}

// var w = while (true) {console.log('1');}

var a =[f1];
a[0]();

var o = {
    func: f1
}
o.func();