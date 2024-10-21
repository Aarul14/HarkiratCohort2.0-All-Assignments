const fs = require('fs');
const path = require('path')
filePath = path.join(__dirname, 'counter2.md')
console.log(filePath)
fs.readFile(filePath,'utf-8', (err,res)=>{
    if(err) console.log(err.message)
    else{
        res+='asdadsdada'
        console.log(res);
    }
})  
console.log('File read operation started'); //this will print first which shows the non blocking nature of JS, the above file system does not block the execution of code rather moves to the next line of the code 



let sum = 0;
for (let i = 0; i < 1e9; i++) {
    sum += i;
}
console.log('Expensive operation done');
