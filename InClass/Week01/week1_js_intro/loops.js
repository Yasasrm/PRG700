var arr = [10, 20, 30, 40, 50]
console.log(arr)

for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    console.log(element)
}

for (const element of arr) {
    console.log(element)
}

for(const index in arr){
    console.log(arr[index])
}

arr.forEach(element => {
    console.log(element)
});