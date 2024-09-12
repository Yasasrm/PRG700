/*********************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Yasas Maddumage Student ID: 170308233 Date: 2024/09/12
*
********************************************************************************/ 

let serverVerbs = ["GET","GET","GET","POST","GET","POST"];
let serverPaths = ["/","/about","/contact","/login","/panel","/logout"];
let serverResponses = ["Welcome to WEB700 Assignment 1","This assignment was prepared by Yasas Maddumage","Yasas Maddumage: yrmaddumage@myseneca.ca","User Logged In","Main Panel","Logout Complete"];
let testVerbs = ["GET","POST"]						
let testPaths = ["/","/about","/contact","/login","/panel","/logout","/randomPath1","/randomPath2"]

function httpRequest(httpVerb, path){
    for (let i = 0; i < serverPaths.length; i++) {
        if(serverVerbs[i] === httpVerb && serverPaths[i] === path){
            return {200 : serverResponses[i]};
        }
    }
    return {404 : `Unable to process ${httpVerb} request for ${path}`};
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomRequest() {
    let randVerb = testVerbs[getRandomInt(2)];
    let randPath = testPaths[getRandomInt(8)];
    let response = httpRequest(randVerb, randPath);
    console.log(response)
}

function automateTests() {
    setInterval(randomRequest, 1000);
}

automateTests();
