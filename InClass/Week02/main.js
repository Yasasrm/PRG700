//Current date
var today = new Date();
console.log(today); 

// Custome date
var birthdate = new Date('1990-01-24');
console.log(birthdate);
birthdate.setFullYear(1995);
console.log(birthdate);
console.log(birthdate.getDate() + 1);
console.log(birthdate.getMonth() + 1);

console.log(today.toLocaleString('fr-CA'));
console.log(today.toLocaleString('hi-IN'));

var timestamp = new Date(1684639396000)
console.log(timestamp);

//Global object
console.log(console)
console.log(__dirname)
console.log(__filename)

//After 2 seconds it will print Hello, World!
setTimeout(function() {
    console.log('Hello, World!');
}, 2000);

//Every 2 seconds it will print Hello, World!
setInterval(() => {
    console.log('Hello, World! from setInterval');
}, 2000);

