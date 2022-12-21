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
// hint. If both are run and neither return a primitive an error is thrown


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
// and that is what ends up being coerced to a number. 







