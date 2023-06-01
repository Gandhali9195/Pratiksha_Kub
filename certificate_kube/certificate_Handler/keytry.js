// var crypto = require("crypto");
// var id = crypto.randomBytes(32).toString('hex');
// console.log("id "+id);

// var val = Math.floor(1000 + Math.random() * 9000);
// console.log(val);
// var s=Buffer.from("Hello World i am pratiksha khade").toString('base64')

// console.log(s.length);

var d="PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjYXZhdGFyXzEyM0FCQyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjhwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJhdmF0YXJfMTIzQUJDIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI2IiB5PSIyOCI+ZFsqXypdYjwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="
//console.log(Buffer.from(d).toString('base64'));
// Importing module
// Prompt is used to take input from console


// md5 is used to hash the given string
const md5 = require("md5");

// Utility function to perform the operation
function hash(d) {


	// To generate the hashed string
	const hash = md5(d);

	// To print hashed string in the console
	console.log("hashed string is: ", hash);
	}



// Calling the function
hash(d);

