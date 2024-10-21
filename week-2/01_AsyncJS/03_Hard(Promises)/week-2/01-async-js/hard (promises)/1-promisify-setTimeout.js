/* Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("resolved succesfully")
        },n)
    })
}


const result = wait(5*1000);
result.then((res)=>{
    console.log(res);
})
