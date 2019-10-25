var userInput;

var city, date, iconImage, temp, humidity, windSpeed, uvIndex;

$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  userInput = $("#search").val();
  // Trims user input and replaces spaces with +.
  userInput = userInput.trim();
  while (userInput.includes(" ")) {
    userInput = userInput.replace(" ", "+");
  }

  var APIKey = "1b1afd411484586400e59a0b2f0bbe81";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&appid=" +
    APIKey;

  var APIKey = "1b1afd411484586400e59a0b2f0bbe81";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&appid=" +
    APIKey;
  var ajaxCall;

  $.ajax({
    url: queryURL,
    method: "GET",
    // if ajax call was
    success: function(data) {
      ajaxCall = data;
      console.log(ajaxCall);
    },
    error: function(data) {
      console.log("Error!");
      alert("Error! Please enter a valid city name.");
    }
  }).then(function(response) {
    city = response.name;
    date = response.dt;
    iconImage = response.weather[0].icon;

    temp = response.main.temp;
    // converting temp to Fahrenheit
    temp = (temp - 273.15) * (9 / 5) + 32;
    temp = temp.toFixed(0);

    humidity = response.main.humidity;
    windSpeed = response.wind.speed;

    var weatherDiv = $("<div>");
    var citySpan = $("<span>");
    var dateSpan = $("<span>");
    var iconImgEL = $("<img>");
    var tempSpan = $("<span>");
    var humiditySpan = $("<span>");
    var windSpeedSpan = $("<span>");
    var UVIndexSpan = $("<span>");

    citySpan.text(city);
    citySpan.attr("class", "citySpan");
    dateSpan.text(date);
    dateSpan.attr("class", "dateSpan");
    iconImgEL.attr("alt", iconImage);
    iconImgEL.attr(
      "src",
      "http://openweathermap.org/img/wn/" + iconImage + "@2x.png"
    );
    tempSpan.text(temp + "°F");
    tempSpan.attr("class", "tempSpan");
    humiditySpan.text("Humidity: " + humidity + " %");
    humiditySpan.attr("class", "humiditySpan");
    windSpeedSpan.text("Wind speed: " + windSpeed);
    windSpeedSpan.attr("class", "windSpeedSpan");

    weatherDiv.append(citySpan);
    weatherDiv.append(dateSpan);
    weatherDiv.append(iconImgEL);
    weatherDiv.append(tempSpan);
    weatherDiv.append(humiditySpan);
    weatherDiv.append(windSpeedSpan);
    $(".lightBlueColor").append(weatherDiv);
  });
});
