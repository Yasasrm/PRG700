console.log('Hello World!');

a = 10 //var a = 10
console.log(a)

a = "Hello"// "Hello"
var a = 20

//let
let b = 200
console.log(b)
b = 300

//let b = 400 //error

const c = "Pritesh"
//c = 200 //error

function test(){
    a = 1000
    let b = 2000
    console.log(a)
    console.log(b)
}
test()
console.log(a)
console.log(b)

//Function Declaration
function welcome(){
    console.log('Welcome to the world of JavaScript')
}
function greet(name) {
    console.log(`Hello ${name}`)
}
welcome()
greet('John')
greet('Jane')

console.log(`Type of a is ${typeof a}`)
console.log(`Type of b is ${typeof b}`)
console.log(`Type of c is ${typeof c}`)
console.log(`Type of welcome() is ${typeof welcome}`)

//Function Expression
// function add(a, b){
//     return a + b
// }
var add = function(a, b){
    return a + b
}

//Arrow Function
var add = (a, b) => {
    //console.log('Hello')
    return a + b
}
console.log(add(10, 20))

var add = (a, b) => a + b