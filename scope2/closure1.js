

function outerFunc() {
  let outerVar = 'I am outVar but not global!';
  function innerFunc() {
    console.log(outerVar); 
    // => logs "I am out...!"
  }
  return innerFunc;
}
function parallelFunc() {
  const myInnerFunc = outerFunc();
  myInnerFunc();
}
parallelFunc();

log.console(outerVar); 
// error as outvar is not global but capture by innerFunc

