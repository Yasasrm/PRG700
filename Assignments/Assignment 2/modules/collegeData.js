const fs = require('fs').promises;

//Holds student and course data
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

//Reads the JSON files asynchronously and initializes the dataCollection
async function initialize() {
    try {
        const studentDataFromFile = await fs.readFile('./data/students.json', 'utf8');
        const courseDataFromFile = await fs.readFile('./data/courses.json', 'utf8');

        const students = JSON.parse(studentDataFromFile);
        const courses = JSON.parse(courseDataFromFile);

        dataCollection = new Data(students, courses);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject("Unable to read files.");
    }
}

//Return promises resolving to the requested data(All students). If no data is found, they reject with a message.
function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length === 0) {
            reject("No results returned.");
        } else {
            resolve(dataCollection.students);
        }
    });
}

//Return promises resolving to the requested data(All students with TA=true). If no data is found, they reject with a message.
function getTAs() {
    return new Promise((resolve, reject) => {
        const tas = dataCollection.students.filter(student => student.TA);
        if (tas.length === 0) {
            reject("No results returned.");
        } else {
            resolve(tas);
        }
    });
}

//Return promises resolving to the requested data(All courses). If no data is found, they reject with a message.
function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length === 0) {
            reject("No results returned.");
        } else {
            resolve(dataCollection.courses);
        }
    });
}

//Export modules
module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses
};
