let x = "5";

console.log(x++, x)

let w = "5";

console.log(w + 1, w)

// the ++ operator coerces the original value of a variable to a number, increments the original variable by 1, and it itself returns the original value before 
// incrementation. It is not the same as var = var + 1, that way of doing things does not do any coercion. if the value were a string, it would concatenate the 1 on to the string. ++ would look like this as a function: 

let y = 5

function plusPlus(original_val){
  var original_val_coerced = Number(original_val);
  y = original_val_coerced + 1; 
  
  return original_val_coerced;
}

console.log(plusPlus(y), y)



// TYPES

// The primitive types are as follows 
// string
// number
// boolean
// object
// undefined
// null

// functions are a sub type of object. 


// Examples of the quirks of NaN

var myAge = Number('0o46') //38
var myNextAge = Number('39') //39

// If you pass a non number value to an operation that requires numbers, NaN will always be returned.
// That is because JS coerces the non number into an invalid number NaN. Any operations involving NaN will always 
// evaluate to NaN.
var myCatsAge = Number('n/a') //NaN
myAge - "my sons age" //NaN

console.log(typeof NaN)

// NaN is not equal to itself, because it is the only value in JS that does not have an identity property.
myCatsAge === myCatsAge  //false

// Because === lies to use about NaN, you have to use isNaN for equality comparisons.
isNaN(myAge) //false
isNaN(myCatsAge) //true
// This should not be true, because the argument passed is not NaN. But it returns true, because isNaN automatically coerces
// its argument to a number. 
isNaN('my sons age') //true

// Because of the above issue in ES6 Number.isNaN was added. It does not coerce argument to a number.
Number.isNaN(myCatsAge) //true
Number.isNaN('my sons age') //false



// COERCION


// JS handles type coercion through abstract operation conceptual functions.
// The first is toPrimitive, it takes a non primitive type and coerces it to a primitve.
// It takes hint of either string or number that tells it what kind of primitive to originally attempt to coerce it into 
// ToPrimitive is auto run by JS whenever you attempt to utilize a non primitive type within an operation requiring a primitive 
// So the hint passed to toPrimitive is determined by what kind of primitive is required in that operation.  
// generally non primitive values have two methods. valueOf and toString. The one run first is determined by the ToPrimitive 
// hint. If both are run and neither return a primitive an error is thrown. If an array is passed to ToPrimitive it is always 
// stringified. When arrays are stringified they lose their brackets.


// The next abstract operation is ToString, it coerces a value into a string and returns it. If a non primitive value is passed to 
// it ToPrimitive is run under the hood with the hint of string passed to it, ToString then returns whatever was returned from 
// ToPrimitive. It will turn almost any value into its string representation the way youd think it would. Things start to get 
// weird with arrays though. String representation of an array displays the arrays contents minus brackets. This means an empty array
// evaluates to empty string. Another weird thing is null and undefined which usually dont evaluate to empty string will if they are
// in an array. 


// The ToNumber abstract operation coerces primitives to numbers. If a non primitive is passed, ToPrimitve is invoked with the number
// hint. Meaning it first attempts to call valueOf on the value, then toString if that doesnt result in a primitve. By default though 
// if valueOf is called on an array or object it automatically returns this of that array or object. Meaning it did not coerce to 
// a primitive, resulting in toString to always need to be called instead. The stringified object is then passed back into ToNumber 
// and that is what ends up being coerced to a number. ToNumber coerces strings to numbers in the way youd expect for the most part.
// There are a few weird things though, empty string instead of being NaN is actually 0. Another weird thing is while undefined 
// becomes NaN like youd think null becomes 0. ToNumber also gets rid of any trailing white space before its coercion.


// ToBoolean, any time youre using a non boolean value in a situation that needs a boolean, this operation occurs. It checks 
// whether the non boolean value is falsey or truthy and coerces accordingly. The only falsy values are "", 0, null, undefined, 
// false, and NaN.



// There is implicit and explicit coercion, an example of implicit is using template literals. An example of explicit is turning
// an array into a string using join("")


// The plus operator added to the left side of a string invokes the ToNumber abstract operation. it is a way to force a value to 
// be a number
let unaryPlus = +"6"

// When there is a value on each side of the plus operator it defaults to the ToNumber operation
let concat = 6 + 6

// If one side is a string though the preference becomes ToString
let concat2 = 6 + '6'

// If one side is a non primitive and the other a number ToPrimitve coerces the non primitive side using the number hint.
// Because valueOf on objects/arrays always evaluates to itself. The array is coerced into an empty string. Because one side 
// is now a string ToString operation is run coercing the 6 into "6". "6" + "" = "6"
let concat3 = 6 + []

//if a string is not involved in an operation, the unary plus defaults to ToNumber, coercing true to 1.
let concat4 = 6 + true

// If the unary plus is on the right side of a single string it invokes ToString abstraction, if on the left it invokes ToNumber.
let concat5 =  "6" +

console.log( unaryPlus, typeof unaryPlus)
console.log( concat, typeof concat)
console.log( concat2, typeof concat2)
console.log( concat3, typeof concat3)
console.log( concat4, typeof concat4)
console.log( concat5, typeof concat5)


// There are three ways to force a string to be a number.

// unary plus on left side
let unaryLeft =  +"8" 
// use the built in Number function
let numberFunction =  Number("8") 
// Using the minus operator only every invokes ToNumber
let minus =  "8" - 8
// Using the minus operator on the left side invokes ToNumber and turns that number negative
let minusLeft =  -"8" 

console.log( unaryLeft, typeof unaryLeft)
console.log( numberFunction, typeof numberFunction)
console.log( minus, typeof minus)
console.log( minusLeft, typeof minusLeft)



// Its okay to use the implicit ToBoolean in your conditional statements, if the only two value options are undefined/null or an 
// object. Otherwise, you should be more explicit with your ToBoolean invocations. 


// At times you may access properties/methods on primitive values. When doing this the primitive is implicitly coerced into an 
// object using a process called boxing. This is where the idea that everything in js is an object, but thats not true. 


// A quality JS program embraces coercion, making sure types are clear, this ensures safety from edge cases. 

// You should determine whether explicit or implicit coercion is necessary on a case by case basis. Basically just based on 
// whichever would make things the most understandable/readable, and for protecting against edge cases. 



// EQUALITY COERCION

// The consensus on the difference between == and === is that == checks for equality of value, whereas === checks for equality of
// value and equality of type. This statement is fundamentally incorrect. == and === are exactly the same when the types match, and
// both operators check for type, where they differ is whether the allow coercion or not. == coerces operands to the same type 
// with a preference toward number type before comparing values, whereas === does no coercion, if types differ it just returns false 

// You should generally use == and just make sure that you know what your types are throughout your program. 
// Coercively null and undefined are equal to eachother, so in a condition  instead of checking for both with a === seperately
// Check for both with one ==. 

// The semantics of === (AKA the strict equality operator) are defined by the IsStrictEqual abstract operation. Its an algorithm
// takes the two operands on either side of it in as inputs, and returns true or false based on a set steps of control flow the algorithm
// puts the inputs through. The first step is checking if the types of the two inputs are different, if they are false is returned.
// If they are the same than it checks if they are number, if they are  it passes them to the Number::equal operation that determines
// if they are equal, if theyre not numbers it passes them to the SameValueNonNumbers operation. 


// The semantics of == (AKA abstract equality operator) are defined by the IsLooselyEqual abstract operation. This algorithm takes 
// in two inputs (the operands on each side of the operator), and returns true or false based on different steps of control flow 
// it passes its inputs through. The first step is to check if the values are of the same type, and if they are the same algorithm 
// that defines the semantics of === is used to check the equality of their values. If they are not of the same type it checks if
// they are null and undefined, if so it returns true. If not it runs through the various other steps to determine the two types
// once this has been determined it coerces them to the same type using the ToNumber algorithm if theyre primitives, or ToPrimitve
// if one is an object, and then recursively runs IsLooselyEqual again passing the coerced values as its new input.

// Summary: 
// If the types are the same the IsStrictEqual algorithm is used for both == and ===
// If x is null y undefined or vice versa return true. 
// If one type is a non primitive coerce that value using ToPrimitve and recursively call IsLooselyEqual again.
// If a value is a string or boolean coerce that value to a number and recursively call IsLooselyEqual again.


// Corner cases where you should avoid ==:
// 1. With values that are or would be coerced to 0, "", or " "
// 2. With non primitives.
// 3. With value == true or value == false, use the implicit ToBoolean instead, or === if it has to be exactly true or false.

// you should always prefer == in all scenarios, except in the above corner cases. 

// Never use == when you dont know the types, with that being said you should write your code so you know the types as much as 
// possible. If you run into a rare occurence where the types are uncertain you should make a comment about it to make it obvious 
// You should always use comments to make the intent of your code obvious if it isnt. 

// In the case you dont know the types that is one of the only circumstances you should use === so it signals to the reader, I dont 
// know the types. === should always be used in a way that its a semantic signal to readers of the code that you dont know the types.














