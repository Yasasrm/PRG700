function compare(a, b) {
    if (a === b) {
      console.log('a and b are equal');
    } else {
      console.log('a and b are not equal');
    }
  }
  
  compare(10, 20);
  compare(10, 10);
  
  function compare(a, b, c){
      if(a > b){
          if(a > c){
              console.log('a is greater than b');
          }else{
              console.log('c is greater than a');
          }
      }else{
          if(b > c){
              console.log('b is greater than a');
          }else{
              console.log('c is greater than b');
          }
      }
  }