/* ASCII notes:
 48 - 57 are numbers 0 - 9
 64 - 90 are uppercase letters A - Z
 97 - 122 are lowercase letters a - z 
 */



var generateBtn = document.querySelector("#generate");

generateBtn.addEventListener("click", function(event) {

    var password = "";
    var selectedChar = [];
    var passwordLength = prompt("Enter your password length as a number:");
    console.log(passwordLength);
    passwordLength = checkIfNaN(passwordLength);

// This loop ensures that the user has entered a number:
// REMEMBER! THIS FUNCTION ACCEPTS A STRING, NOT A NUMBER!
function checkIfNaN (x) {
    while (typeof(x) === "string" || x === null) {
        if (x && (!(isNaN(parseInt(x))))) {
            x = parseInt(x);
            console.log("Condition: true: " + x + " Parseint:" + parseInt(x));
            return x;
        }
        else if (x === null){
            console.log("Condition: false: " + x);
            x = prompt("Enter your password length (as a number!):");
        }
        else {x = prompt("Enter your password length (as a number!):");}
    }
}

// This loops around until the user has selected an acceptable password length n (8<n<128)
while (passwordLength < 8 || passwordLength > 128) {
    if (passwordLength < 8) {
        alert("Password must be at least 8 characters long!");
        passwordLength = prompt("Enter a new password length:");
        passwordLength = checkIfNaN(passwordLength);}
        
    
    else if (passwordLength > 128) {
        alert("Password cannot be longer than 128 characters!");
        passwordLength = prompt("Enter a new password length:");
        passwordLength = checkIfNaN(passwordLength);}
    else {
        passwordLength = checkIfNaN(passwordLength);
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
    var randIndex = Math.floor(Math.random()*selectedChar.length);
    randCharType = selectedChar[randIndex];

    if (randCharType === "lowerCase") {
        // generates random lowercase letter as ASCII value
        var newChar = String.fromCharCode(Math.floor(Math.random()*26)+97);
        console.log(newChar);
    }
    else if (randCharType === "upperCase") {
        //generates random Uppercase letter as ASCII value
        var newChar = String.fromCharCode(Math.floor(Math.random()*26)+64);
        console.log(newChar);
    }
    else if (randCharType === "number") {
        // generates random number (0-9) as ASCII value
        var newChar = String.fromCharCode(Math.floor(Math.random()*10)+48);
   
    }
    else {
        var specialCharArr = ["\\","!","|","\"","@","·","#","$","~","%","&","¬","/","(",")","=","?","'","^","<",">",",",";",".",":","-","_","+","-","*","[","]","{","}"];
        var specialCharIndex = Math.floor(Math.random()*specialCharArr.length);
        var newChar = specialCharArr[specialCharIndex];
        console.log(newChar);
    }
    password = (password + newChar);
}

passwordDiv = document.getElementById("password");
passwordDiv.innerHTML = password;
});