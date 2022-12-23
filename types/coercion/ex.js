// TODO: write the validation functions



const isValidName = (name) => {
    // Validates name is a string
    // Validates string has no whitespace and has a length of at least 3
    if(typeof name === "string" && name.trim().length > 3){
        return true
    }
    
    return false

    // To determine if a param is a string you should always use typeof param === "string"
    // To determine if a string is empty you should always use length > 0, and to make sure theres no whitespace trim()
}

const hoursAttended = (attended, length) => {

    // Validates that the type of attended and length is either number or string.
    // Validates that attended and length can be treated as a number even if they are a string, that the number 
    // is 0 or above, and that if its is a string it is not an empty string, because empty strings are coerced 
    // to 0 by the ToNumber abstraction.
    // Validates that attended is less than or equal to length when they are coerced to numbers.
    // Validates that neither attended nor length when coerced to a number are floats.
  
    if(typeof attended === 'number' | typeof attended === 'string' && 
        typeof length === 'number' | typeof length === 'string' && 

        String(attended).trim() !== "" && 
        String(length).trim() !== "" && 
        
        +length >= 0 && 
        +attended >= 0 && 

        +attended <= +length && 

        Number.isInteger(+attended) && 
        Number.isInteger(+length)){

        return true
    }

    return false
}

// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6,10) === true);
console.log(hoursAttended(6,"10") === true);
console.log(hoursAttended("6",10) === true);
console.log(hoursAttended("6","10") === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);
console.log(hoursAttended("",6) === false);
console.log(hoursAttended(6,"") === false);
console.log(hoursAttended("","") === false);
console.log(hoursAttended("foo",6) === false);
console.log(hoursAttended(6,"foo") === false);
console.log(hoursAttended("foo","bar") === false);
console.log(hoursAttended(null,null) === false);
console.log(hoursAttended(null,undefined) === false);
console.log(hoursAttended(undefined,null) === false);
console.log(hoursAttended(undefined,undefined) === false);
console.log(hoursAttended(false,false) === false);
console.log(hoursAttended(false,true) === false);
console.log(hoursAttended(true,false) === false);
console.log(hoursAttended(true,true) === false);
console.log(hoursAttended(10,6) === false);
console.log(hoursAttended(10,"6") === false);
console.log(hoursAttended("10",6) === false);
console.log(hoursAttended("10","6") === false);
console.log(hoursAttended(6,10.1) === false);
console.log(hoursAttended(6.1,10) === false);
console.log(hoursAttended(6,"10.1") === false);
console.log(hoursAttended("6.1",10) === false);
console.log(hoursAttended("6.1","10.1") === false);
