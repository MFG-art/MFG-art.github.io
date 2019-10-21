
var userInput;




var city, date, iconImage, temp, humidity, windSpeed, uvIndex;


$("#submitBtn").on("click",function(event){
    event.preventDefault();
    userInput = $("#search").val()
    userInput = userInput.trim();

    while (userInput.includes(" ")){
        userInput = userInput.replace(" ","+");
        console.log(userInput);
    }

    var APIKey = "1b1afd411484586400e59a0b2f0bbe81";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput + "&appid=" + APIKey;


    var ajaxCall;

    $.ajax({
        url: queryURL,
        method: "GET",
        success: function(data){
            ajaxCall = data;
            console.log(ajaxCall);
        },
        error: function(data){
            console.log("Error!");
            alert("Error! Please enter a valid city name.");
        },
    })

  
    .then(function(response){
        console.log(response);
        city = response.name;
        date = response.dt;
        temp = response.main.temp;
        console.log(temp);
        // converting temp to Fahrenheit
        temp = (((temp-273.15)*(9/5))+32);
        temp = temp.toFixed(0);
        console.log(temp);
        humidity = response.main.humidity;
    });


});