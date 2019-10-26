//Variable used to store user input
var userInput;
var pastSearches = [];
var cityNames = [];
var pushToArray = false;
var pastSearchesObject = {};
console.log(pastSearches.length);

updateButtons();

//Variables used for display purposes
var city, date, iconImage, temp, humidity, windSpeed, uvIndex;
var responseTrue;

function updateButtons() {
  $(".grayColor").empty();
  if (localStorage.getItem("pastSearchesJSON") !== null) {
    pastSearchesObject = localStorage.getItem("pastSearchesJSON");
    pastSearchesObject = JSON.parse(pastSearchesObject);
    pastSearches = pastSearchesObject.pastSearches;
    console.log(pastSearches);
    cityNames = pastSearchesObject.cityNames;

    for (var i = 0; i < pastSearches.length; i++) {
      var newBtn = $("<button>");
      newBtn.text(cityNames[i]);
      newBtn.attr("class", "newButton");
      $(".grayColor").append(newBtn);
    }
  }
}

$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  userInput = $("#search").val();
  // Trims user input and replaces spaces with +.
  userInput = userInput.trim();
  userInput = userInput.toLowerCase();
  while (userInput.includes(" ")) {
    userInput = userInput.replace(" ", "+");
  }

  //API key and URL needed for first AJAX call
  var APIKey = "1b1afd411484586400e59a0b2f0bbe81";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
    // if ajax call was successful
    success: function(data) {
      responseTrue = true;
      ajaxCall = data;
      console.log(ajaxCall);
    },
    error: function(data) {
      responseTrue = false;
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
  });

  //Waits for AJAX call to end.
  setTimeout(function() {
    if (responseTrue) {
      //
      if (pastSearches.length > 0) {
        for (var i = 0; i < pastSearches.length; i++) {
          if (pastSearches[i] !== userInput) {
            pushToArray = true;
          } else {
            pushToArray = false;
            break;
          }
        }
      } else {
        pushToArray = true;
      }

      if (pushToArray) {
        pastSearches.push(userInput);
        cityNames.push(city);
        console.log(cityNames);
        pastSearchesObject = {
          pastSearches: pastSearches,
          cityNames: cityNames
        };
        let pastSearchesJSON = JSON.stringify(pastSearchesObject);
        localStorage.setItem("pastSearchesJSON", pastSearchesJSON);
        console.log(pastSearches);
        updateButtons();
      }

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
      var dateMoment = moment(date, "X");
      date = dateMoment.format("LL");
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
    }
  }, 300);
});

$(".newButton").on("click", function(event) {
  event.preventDefault();

  userInput = $(this).text();
  while (userInput.includes(" ")) {
    userInput = userInput.replace(" ", "+");
  }

  //API key and URL needed for first AJAX call
  var APIKey = "1b1afd411484586400e59a0b2f0bbe81";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
    // if ajax call was successful
    success: function(data) {
      responseTrue = true;
      ajaxCall = data;
      console.log(ajaxCall);
    },
    error: function(data) {
      responseTrue = false;
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
  });

  //Waits for AJAX call to end.
  setTimeout(function() {
    if (responseTrue) {
      //
      if (pastSearches.length > 0) {
        for (var i = 0; i < pastSearches.length; i++) {
          if (pastSearches[i] !== userInput) {
            pushToArray = true;
          } else {
            pushToArray = false;
            break;
          }
        }
      } else {
        pushToArray = true;
      }

      if (pushToArray) {
        pastSearches.push(userInput);
        console.log(pastSearches);
        pastSearchesObject = { pastSearches: pastSearches };
        let pastSearchesJSON = JSON.stringify(pastSearchesObject);
        localStorage.setItem("pastSearchesJSON", pastSearchesJSON);
        console.log(pastSearches);
        updateButtons();
      }

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
      var dateMoment = moment(date, "X");
      date = dateMoment.format("LL");
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
    }
  }, 300);
});

updateButtons();
console.log(cityNames);
console.log(pastSearches);
