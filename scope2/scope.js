// from https://www.geeksforgeeks.org/static-and-dynamic-scoping/

// whatsoever if one cannot find the variable go to the top first 

// Since dynamic scoping is very uncommon in
// the familiar languages, we consider the
// following pseudo code as our example. It
// prints 20 in a language that uses dynamic
// scoping.  
 
var x = 10; //cannot use let
 
// Called by g()
function f(a)
{
   console.log("f(a) a:"+a+" x:"+x);
   return x; // +y; // it cannot even find variable; once not in global and it stops!!!
}
 
// g() has its own variable
// named as x and calls f()
function g()
{
   var x = 20;
   var y = 200
   console.log("g(x) x:"+x+" f(x):"+x);
   return f(x);
}

function g2f()
{
   var x = 30;
   var y= 300
   console.log("g2f(x) x:"+x+" f(x):"+x);
   return g;
}

// whatever you throw at it f(a) always use x at the lexical scope i.e. 10
 
function myFunction()
{
  console.log("myFunction f(g())"+f(g())); // got g() paraenthesis hence exceute the g
  // err function f2 = g()
  console.log("myFunction g()"+g()); // not sure what is f() role in f(g())
  var gfun = g; // no () it is just a function not a function call
  console.log("myFunction gfun()"+gfun())
  var g2ffun = g2f; // no () it is just a function not a function call
  console.log("myFunction g2ffun()"+g2ffun()) 
  // !!!!! for some reasons it generate a log of function on function !!!!
  
  document.getElementById("demo").innerHTML = f(g()); // print 10 not 20 !!! lexical scoping 5 + 6;
}
