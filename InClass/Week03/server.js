const express = require('express');
const app = express();
const SERVER_PORT = 3000;

// http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// http://localhost:3000/hello
app.get('/hello', (req, res) => {
    res.send('<h1>Hello WEB700!</h1>');
});

// http://localhost:3000/student
app.post('/student', (req, res) => {
    const stud = {
        studentNumber: 'W1234567',
        name: 'John Doe',
        program: 'BTT',
        courses: ['WEB700', 'WEB701', 'WEB702'],
        location: 'Markham Campus',
        grades: {
            WEB700: 90,
            WEB701: 85,
            WEB702: 95
        },
        city: 'Toronto'
        }

        res.send(stud)
});

// Query Parameters
// http://localhost:3000/employee?name=John&age=30
app.get('/employee', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    res.send(`Employee Name: ${name}, Age: ${age}`);
});

// Path Parameters
// http://localhost:3000/employee/John/30
app.get('/employee/:name/:age', (req, res) => {
    const name = req.params.name;
    const age = req.params.age;
    res.send(`Employee Name: ${name}, Age: ${age}`);
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})
