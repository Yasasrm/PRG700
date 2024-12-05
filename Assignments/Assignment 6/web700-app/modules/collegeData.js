const Sequelize = require('sequelize');
var sequelize = new Sequelize('neondb', 'neondb_owner', '1nabFStNgQ2q', {
    host: 'ep-damp-forest-a5g96j25.us-east-2.aws.neon.tech',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

const Student = sequelize.define('Student', {
    studentNum: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING
});

const Course = sequelize.define('Course', {
    courseId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING
});

Course.hasMany(Student, { foreignKey: 'course' });

module.exports.initialize = () => {
    return sequelize.sync()
        .then(() => Promise.resolve())
        .catch(err => Promise.reject("Unable to sync the database"));
};

module.exports.getAllStudents = () => {
    return Student.findAll()
        .then(data => Promise.resolve(data))
        .catch(() => Promise.reject("No results returned"));
};

module.exports.getCourses = () => {
    return Course.findAll()
        .then(data => Promise.resolve(data))
        .catch(() => Promise.reject("No results returned"));
};

module.exports.getCourseById = function(id) {
    return new Promise((resolve, reject) => {
        Course.findAll({ where: { courseId: id } })
            .then(data => resolve(data[0]))
            .catch(() => reject("no results returned"));
    });
};

module.exports.getStudentByNum = function (num) {
    return new Promise((resolve, reject) => {
        Student.findAll({ where: { studentNum: num } })
            .then(data => resolve(data[0]))
            .catch(() => reject("no results returned"));
    });
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise((resolve, reject) => {
        Student.findAll({ where: { course } })
            .then(data => resolve(data))
            .catch(() => reject("no results returned"));
    });
};

// Add student
module.exports.addStudent = (studentData) => {
    studentData.TA = studentData.TA ? true : false;
    console.log(studentData);
    for (const key in studentData) {
        if (studentData[key] === "") studentData[key] = null;
    }
    return Student.create(studentData)
        .then(() => Promise.resolve())
        .catch(() => Promise.reject("Unable to create student"));
};

//Update student
module.exports.updateStudent = function(studentData) {
    studentData.TA = studentData.TA ? true : false;
        for (let key in studentData) {
            if (studentData[key] === "") {
                studentData[key] = null;
            }
        }
        return new Promise((resolve, reject) => {
            Student.update(studentData, { where: { studentNum: studentData.studentNum } })
                .then(() => resolve())
                .catch(() => reject("unable to update student"));
        });
};

//Delete student
module.exports.deleteStudentById = (id) => {
    return Student.destroy({ where: { studentNum: id } })
        .then(() => Promise.resolve())
        .catch(() => Promise.reject("Unable to delete student"));
};

//Delete course
module.exports.deleteCourseById = (id) => {
    return Course.destroy({ where: { courseId: id } })
        .then(() => Promise.resolve())
        .catch(() => Promise.reject("Unable to delete course"));
};

//Add course
module.exports.addCourse = (courseData) => {
    for (let key in courseData) {
        if (courseData[key] === "") {
            courseData[key] = null;
        }
    }
    return new Promise((resolve, reject) => {
        Course.create(courseData)
            .then(() => resolve())
            .catch(() => reject("unable to create course"));
    });
};

//Update course
module.exports.updateCourse = (courseData) => {
    for (let key in courseData) {
        if (courseData[key] === "") {
            courseData[key] = null;
        }
    }
    return new Promise((resolve, reject) => {
        console.log(courseData);
        Course.update(courseData, { where: { courseId: courseData.courseId } })
            .then(() => resolve())
            .catch(() => reject("unable to update course"));
    });
};


