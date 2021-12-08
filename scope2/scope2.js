// const 
// var 
let myGlobal = 0;
function func() {
  // const 
  // var 
  let myVar = 1;
  console.log(myGlobal); 
  // logs "0"
  function innerOfFunc() {
    // const 
    // var 
    let myInnerVar = 2;
    console.log(myVar, myGlobal); 
    // logs "1 0"
    function innerOfInnerOfFunc() {
      console.log(myInnerVar, myVar, myGlobal); 
      // logs "2 1 0"
      // thought it cannot access myVar
      
    }
    innerOfInnerOfFunc();
  }
  innerOfFunc();
}
func();