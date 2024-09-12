console.log('Object Literal Example');
// Object Literal
var student = {
    studentId: 1,  //key-value pair
    studentName: 'John',
    studentAge: 20,
    studentMarks: 80,
    city: 'New York'
}
console.log(student)

for(const key in student){
    console.log(key, student[key])
}

for(const element of Object.keys(student)){
    console.log(element)
}

for(const element of Object.values(student)){
    console.log(element)
}

Object.values(student).forEach(element => {
    console.log(element)
})