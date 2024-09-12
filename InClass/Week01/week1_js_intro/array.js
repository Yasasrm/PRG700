console.log('Array Example')
var arr = [10, 20, 30, 40, 50]
console.log(arr)
console.log(arr[0])

arr[0] = 100
console.log(arr)
//a[5] = 60 //error
arr.push(60)
console.log(arr)
console.log(arr.length)
console.log(typeof arr)

var b = [10, 20, 'Hello', true, 30.5]
console.log(b)

var c = arr + b
console.log(c)//100,20,30,40,50,10,20,Hello,true,30.5
console.log(typeof c) //string

var d = arr.concat(b)
console.log(d)//[100, 20, 30, 40, 50, 60, 10, 20, 'Hello', true, 30.5]

var e = [1, 2, arr, 3, 4]
console.log(e)//[1, 2, [100, 20, 30, 40, 50, 60], 3, 4]

//Spread Operator
var f = [1, 2, ...arr, 3, 4]
console.log(f)

let newArray = {};
newArray[5] = 2;
newArray[2] = 3;
console.log(newArray)