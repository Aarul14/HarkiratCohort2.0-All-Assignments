let count = 0;

const Increment = () => {
  setTimeout(() => {
    count += 1; 
    console.log(count); 
    if (count < 10) {
      Increment(); 
    } else {
      console.log("Timer stopped after reaching 10."); 
    }
  }, 1000); 
};

Increment();
