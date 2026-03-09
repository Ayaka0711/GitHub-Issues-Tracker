1. Difference between var, let, and const

Answer:

var : Function scoped. It can be redeclared and updated. Older way to declare variables.

let : Block scoped. It can be updated but cannot be redeclared in the same scope.

const : Block scoped. It cannot be updated or redeclared after declaration.

Example:
var a = 10;
let b = 20;
const c = 30;

2️. What is the Spread Operator (...)

Answer:

The spread operator is used to expand elements of an array or object into another array or object.
It helps to copy, merge, or pass elements easily.


3️. Difference between map(), filter(), and forEach()

Answer:

map() : Creates a new array by applying a function to each element.

filter() : Creates a new array with elements that pass a condition.

forEach() : Executes a function for each element but does not return a new array.

Example:

const numbers = [1,2,3];

numbers.map(n => n*2);
numbers.filter(n => n>1);
numbers.forEach(n => console.log(n));


4️. What is an Arrow Function

Answer:

An arrow function is a shorter way to write a function in JavaScript using =>.
It makes code simpler and more readable.

Example:

const add = (a,b) => a + b;


5️. What are Template Literals

Answer:

Template literals are used to insert variables inside strings using backticks ( ) and ${}.
They make string formatting easier.

Example:

let name = "Ayaka";
console.log(`Hello ${name}`);

Output: Hello Ayaka

