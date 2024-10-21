const fs = require('fs');
const path = require('path')
filePath = path.join(__dirname, '01_file_cleaner.md')
console.log(filePath)

let result = "";
fs.readFile(filePath,'utf-8', (err,res)=>{
    if(err) console.log(err.message)
    else{
        const cleanedResult = res.replace(/\s+/g, ' ')  // / are delimiters for start and end. s refers to any space, be it new line, blank space etc, g is for global flag means regex works for all the string not just the first
        console.log(cleanedResult);
    }
})  