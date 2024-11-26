/*********************************************************************************
*  WEB700 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Yasas Maddumage Student ID: 170308233 Date: 10/10/2024

*  WEB700 – Assignment 4
*  Name: Yasas Maddumage Student ID: 170308233 Date: 10/31/2024
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const path = require('path');
var app = express();
const collegeData = require(path.join(__dirname, "modules", "collegeData"));
const ejs = require("ejs"); 
app.engine('ejs', ejs.renderFile); 
app.set('view engine', 'ejs'); 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)
app.set('layout', 'layouts/main');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set "views" folder as the static directory for serving HTML files
app.use(express.static(path.join(__dirname, "views")));

// Body-parser middleware to handle form submissions
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    let route = req.path.substring(1);
    app.locals.activeRoute =
        "/" +
        (isNaN(route.split("/")[1])
            ? route.replace(/\/(?!.*)/, "")
            : route.replace(/\/(.*)/, ""));
    next();
});

app.locals.navLink = function (url, options) {
    return (
        '<li' +
        (url === app.locals.activeRoute ? ' class="nav-item active"' : ' class="nav-item"') +
        '><a class="nav-link" href="' +
        url +
        '">' +
        options.fn(this) +
        "</a></li>"
    );
};

app.locals.equal = function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Ejs Helper 'equal' needs 2 parameters");
    return lvalue !== rvalue ? options.inverse(this) : options.fn(this);
};

// Route to serve the home page
/*app.get("/", (req, res) => {
    res.sendFile("home.html", { root: "views" });
});*/
app.get('/', (req, res) => {
    res.render('home', { title: "Home" }); 
  });  
  
// Route to serve the about page
app.get("/about", (req, res) => {
    //res.sendFile("about.html", { root: "views" });
    res.render('about');
});

// Route to serve the htmlDemo page
app.get("/htmlDemo", (req, res) => {
    //res.sendFile("htmlDemo.html", { root: "views" });
    res.render('htmlDemo');
});

//App_URL/students?course=?
// app.get("/students", async (req, res) => {
//     console.log('Loading students from:', path.resolve('./data/students.json'));

//     const course = req.query.course;
//     try {
//         const students = await getStudents(course);
//         res.render("students", { students });
//     } catch (err) {
//         console.log(err);
//         res.json({ message: "no results" });
//     }
// });

//App_URL/tas
// app.get("/tas", async (req, res) => {
//     try {
//         res.json(await collegeData.getTAs());
//     } catch (err) {
//         console.log(err);
//         res.json({ message: "no results" });
//     }
// });

//App_URL/courses
// app.get("/courses", async (req, res) => {
//     try {
//         res.json(await collegeData.getCourses());
//     } catch (err) {
//         console.log(err);
//         res.json({ message: "no results" });
//     }
// });

//App_URL/student/num
// app.get("/student/:num", async (req, res) => {
//     const studentId = req.params.num;
//     try {
//         res.json(await collegeData.getStudentByNum(studentId));
//     } catch (err) {
//         console.log(err);
//         res.json({ message: "no results" });
//     }
// });

//Add Student -get
// app.get('/students/add', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'addStudent.html'));
// });

//Add Student -post
// app.post('/students/add', (req, res) => {
//     collegeData.addStudent(req.body)
//         .then(() => {
//             res.redirect('/students');
//         })
//         .catch((err) => {
//             res.status(500).send("Unable to add student");
//         });
// });

//Get Students
app.get('/students', async (req, res) => {
    const course = req.query.course;
    try {
        const students = course ? await getStudents(course) : await getStudents();
        if (students.length > 0) {
            res.render('students', { students });
        } else {
            res.render('students', { message: "No results" });
        }
    } catch (err) {
        res.render('students', { message: "No results" });
    }
});

//Get Student by id
app.get("/student/:studentNum", (req, res) => {
    const studentNum = req.params.studentNum;
    Promise.all([
        collegeData.getStudentByNum(studentNum),
        collegeData.getCourses()                
    ])
    .then(([student, courses]) => {
        res.render("student", { student, courses });
    })
    .catch((err) => {
        console.log(err);
        res.render("student", { message: "Student not found" });
    });
});


//Update student
app.post("/student/update", (req, res) => {
    const updatedStudent = req.body;
    console.log(updatedStudent)
    collegeData.updateStudent(updatedStudent)
        .then(() => {
            res.redirect("/students");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Unable to update student");
        });
});

//Get Courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then((data) => {
            if (data.length > 0) {
                res.render("courses", { courses: data });
            } else {
                res.render("courses", { message: "No courses available" });
            }
        })
        .catch(() => {
            res.render("courses", { message: "Error fetching courses" });
        });
});

//Get Course by id
app.get("/course/:id", (req, res) => {
    const courseId = req.params.id;

    collegeData.getCourseById(courseId)
        .then((course) => {
            res.render("course", { course: course });
        })
        .catch((error) => {
            res.render("course", { message: error });
        });
});

const getStudents = async (course) => {
    try {
        if (course) {
            return await collegeData.getStudentsByCourse(course);
        } else {
            return await collegeData.getAllStudents();
        }
    } catch (err) {
        console.error(err);
        throw new Error("No results");
    }
};

// Other route handlers.
app.use((req, res, next) => {
    res.sendFile("error.html", { root: "views" });
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

