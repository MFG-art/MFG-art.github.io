/* ASCII notes:
 48 - 57 are numbers 0 - 9
 64 - 90 are uppercase letters A - Z
 97 - 122 are lowercase letters a - z 
 */

var passwordLength = prompt("Enter your password length as a number:");
passwordLength = checkIfNaN(passwordLength);


// This loop ensures that the user has entered a number:
function checkIfNaN (x) {
    while (typeof(x) === "string") {
        x = prompt("Enter your password length (as a number!):");
        if (!(isNaN(parseInt(x)))) 
        {x = parseInt(x);
        return x;
        }
    }
}


var password = [];

// This loops around until the user has selected an acceptable password length n (8<n<128)
while (passwordLength < 8 || passwordLength > 128) {
    if (passwordLength <8) {
        alert("Password must be at least 8 characters long!");
        passwordLength = prompt("Enter a new password length:");
        if (!(isNaN(parseInt(passwordLength)))) {
            passwordLength = parseInt(passwordLength);
            passwordLength = checkIfNaN(passwordLength);
        }
        
    }
    else if (passwordLength > 128) {
        alert("Password cannot be longer than 128 characters!");
        passwordLength = prompt("Enter a new password length:");
        if (!(isNaN(parseInt(passwordLength)))) {
            passwordLength = parseInt(passwordLength); 
            passwordLength = checkIfNaN(passwordLength);}
        
    }
}

var doUpperCase = confirm("Do you want to include uppercase letters?");
var doLowerCase = confirm("Do you want to include lowercase letters?");
var doNumber = confirm("Do you want to include numbers?");
var doSpecialChar = confirm("Do you want to include special symbols?");

if (doUpperCase) {selectedChar.push("upperCase");}
if (doLowerCase) {selectedChar.push("lowerCase");}
if (doNumber) {selectedChar.push("number");}
if (doSpecialChar) {selectedChar.push("specialChar");}


for (var i = 0; i < passwordLength; i++){
    var randIndex = Math.floor(Math.random()*3)

    if (randCharType === "upperCase") {
        // generates random lowercase letter as ASCII value
        var newChar = Math.floor(Math.random()*26)+97; 
    }
    else if (randCharType === "lowerCase") {
        //generates random Uppercase letter as ASCII value
        var newChar = Math.floor(Math.random()*26)+64;
    }
    else if (randCharType === "number") {
        // generates random number (0-9) as ASCII value
        var newChar = Math.floor(Math.random*10)+48;
    }
}



 

