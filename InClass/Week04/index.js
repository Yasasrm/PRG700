const express = require('express');
const path = require('path');
const app = express();

const SERVER_PORT = process.env.port || 3000;

// Middleware
app.use("/views", express.static('views'));
app.use(express.static('public'));

// Parse JSON data from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a middleware function
const helper = (req, res, next) => {
    console.log('Middleware function');
    next();
}

const logger = (req, res, next) => {
    let loggedItem = `Request from: ${req.get('user-agent')} [${new Date()}]`;
    console.log(loggedItem);
    req.log = loggedItem;
    next();
}

app.use(helper);
app.use(logger);

// Routes
// http://localhost:3000/
app.get('/', (req, res) => {
    console.log(req.log);
    res.send('Hello World!');
});

// http://localhost:3000/home
// app.get('/home', (req, res) => {
//     // res.sendFile(__dirname + '/views/index.html');
//     // res.sendFile('views/index.html', { root: __dirname });
        // console.log(path.join(__dirname + '/views/index.html'))
//     res.sendFile(path.join(__dirname + '/views/index.html'));
// });

// Get request data using body
// http://localhost:3000/student
app.post('/student', (req, res) => {
    let stud = req.body
    console.log(stud);
    res.send(stud);
})

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
})