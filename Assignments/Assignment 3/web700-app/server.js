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
const path = require('path');
var app = express();
const collegeData = require("./modules/collegeData");

// Set "views" folder as the static directory for serving HTML files
app.use(express.static(path.join(__dirname, "views")));

// Route to serve the home page
app.get("/", (req, res) => {
    res.sendFile("home.html", { root: "views" });
});

// Route to serve the about page
app.get("/about", (req, res) => {
    res.sendFile("about.html", { root: "views" });
});

// Route to serve the htmlDemo page
app.get("/htmlDemo", (req, res) => {
    res.sendFile("htmlDemo.html", { root: "views" });
});

//App_URL/students?course=?
app.get("/students", async (req, res) => {
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

//App_URL/tas
app.get("/tas", async (req, res) => {
    try {
        res.json(await collegeData.getTAs());
    } catch (err) {
        res.json({ message: "no results" });
    }
});

//App_URL/courses
app.get("/courses", async (req, res) => {
    try {
        res.json(await collegeData.getCourses());
    } catch (err) {
        res.json({ message: "no results" });
    }
});

//App_URL/student/num
app.get("/student/:num", async (req, res) => {
    const studentId = req.params.num;
    try {
        res.json(await collegeData.getStudentByNum(studentId));
    } catch (err) {
        res.json({ message: "no results" });
    }
});

// Other route handlers.
app.use((req, res, next) => {
    res.status(404).send("404 - We're unable to find what you're looking for.");
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

// Export the app for Vercel
module.exports = app;

