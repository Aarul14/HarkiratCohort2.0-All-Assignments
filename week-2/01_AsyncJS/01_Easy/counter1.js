let count = 0;
const timer = async () => {
   const intervalid = setInterval( ()=>{
        count = count+ 1;
        console.log(count);
        if(count === 10){
            setTimeout(()=>clearInterval(intervalid));
        }
},1000)
}


timer();
