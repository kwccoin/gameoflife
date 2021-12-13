var d=999;

function foo(a) {

	var b = a * 2;
    var d = 24;
    
    	// bar(b * 3);
    
	return function bar(c) {
		console.log( a, b, c, d );
	}


}

foo( 2 ) (3); // 2 4 12