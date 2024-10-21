/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */


// * I used this method but, this does not halt the main thread as The setTimeout function is asynchronous and does not block the main thread; instead, it schedules the callback to run after the specified delay
//     return new Promise(resolve => {
//       setTimeout(resolve, milliseconds);
//     });
//   }
  // * This while loop block the main thread, will wait till the time 
  function sleep(milliseconds) {
    return new Promise(resolve => {
      const start = Date.now(); // Get the current time
      while (Date.now() - start < milliseconds) {
        // Busy wait
      }
      resolve("resolved after 5 sec"); // Resolve the promise once done
    });
  }

  sleep(5000).then((resolve)=> console.log(resolve));