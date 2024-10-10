/*********************************************************************************
*  WEB700 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Yasas Maddumage Student ID: 170308233 Date: 10/10/2024
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const collegeData = require('./modules/collegeData');

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//App_URL/students?course=?
app.get('/students', async (req, res) => {
    const course = req.query.course;
    try {
        let students;
        if (course) {
            students = await collegeData.getStudentsByCourse(course);
        } else {
            students = await collegeData.getAllStudents();
        }
        res.json(students);
    } catch (err) {
        res.json({ message: "no results" });
    }
});

// Initialize the data and start the server
collegeData.initialize()
    .then(() => {
        // setup http server to listen on HTTP_PORT
        app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
    })
    .catch(err => {
        console.log("Failed to initialize data:", err);
    });


