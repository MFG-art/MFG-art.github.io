// 48 - 57 are numbers 0 - 9
//  64 - 90 are uppercase letters A - Z
// 97 - 122 are lowercase letters a - z
var passwordLength;
passwordLength = prompt("Enter your password length (as a number)");
passwordLength = parseInt(passwordLength);
var selectedChar = [];

while (passwordLength < 8 || passwordLength > 128) {
    if (passwordLength <8) {
        alert("Password must be at least 8 characters long!");
        passwordLength = prompt("Enter a new password length");
        passwordLength = parseInt(passwordLength);
    }
    else if (passwordLength > 128) {
        alert("Password cannot be longer than 128 characters!");
        passwordLength = prompt("Enter a new password length");
        passwordLength = parseInt(passwordLength);
    }
}

confirm("Do you want to include uppercase letters?");
confirm("Do you want to include lowercase letters?");
confirm("Do you want to include numbers?");
confirm("Do you want to include special symbols?");

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



 

