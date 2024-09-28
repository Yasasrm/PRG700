var student = {
    studentId: 1,
    studentName: "John Doe",
    studentAge: 20,
    studentGender: 'Male',
    studentCity: 'Toronto',
    studentGrade: "A",

    print: function() {
        console.log(this.studentId);
        console.log(this.studentName);
        console.log(this.studentAge);
        console.log(this.studentGender);
        console.log(this.studentCity);
        console.log(this.studentGrade);
    }
}

student.print();

//Class
class Student{
    constructor(studentId, studentName, studentAge, studentGender, studentCity, studentGrade){
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentAge = studentAge;
        this.studentGender = studentGender;
        this.studentCity = studentCity;
        this.studentGrade = studentGrade;
    }

    print(){
        console.log(this.studentId);
        console.log(this.studentName);
        console.log(this.studentAge);
        console.log(this.studentGender);
        console.log(this.studentCity);
        console.log(this.studentGrade);
    }
}

var s1 = new Student(2, "Jane Doe",25, "Female", "New York", "B");
s1.print();