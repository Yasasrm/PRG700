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

function httpRequest(httpVerb, path){
    for (let i = 0; i < serverPaths.length; i++) {
        if(serverVerbs[i] === httpVerb && serverPaths[i] === path){
            return {200 : serverResponses[i]};
        }
    }
    return {404 : `Unable to process ${httpVerb} request for ${path}`};
}

console.log(httpRequest("GET", "/"));
console.log(httpRequest("GET", "/about"));
console.log(httpRequest("PUT", "/")); 