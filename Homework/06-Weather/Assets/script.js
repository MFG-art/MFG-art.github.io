//Variable used to store user input
var pastSearches = [];
var cityNames = [];
var pushToArray = false;
var pastSearchesObject = {};

//Variables used for display purposes
var city, date, iconImage, temp, humidity, windSpeed, uvIndex;
var responseTrue;

//If past search results are stored locally, this will pull up weather information for the most recent search.
if (localStorage.getItem("pastSearchesJSON")) {
  pastSearchesObject = JSON.parse(localStorage.getItem("pastSearchesJSON"));
  pastSearches = pastSearchesObject.pastSearches;
  userInput = pastSearches[pastSearches.length - 1];
  getWeather(userInput);
}

updateButtons();

function updateButtons() {
  $(".grayColor").empty();
  if (localStorage.getItem("pastSearchesJSON")) {
    pastSearchesObject = localStorage.getItem("pastSearchesJSON");
    pastSearchesObject = JSON.parse(pastSearchesObject);
    pastSearches = pastSearchesObject.pastSearches;
    cityNames = pastSearchesObject.cityNames;

    for (var i = 0; i < pastSearches.length; i++) {
      var newBtn = $(
        "<button class='btn btn-light newButton m-sm-2'></button>"
      );
      newBtn.text(cityNames[i]);
      $(".grayColor").append(newBtn);
    }
  } else {
    return;
  }
}

function getWeather(userInput) {
  var APIKey = "1b1afd411484586400e59a0b2f0bbe81";
  var proxy = "https://chriscastle.com/proxy/index.php?:proxy:";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?";
  let lat, long;

  $.ajax({
    url: proxy + queryURL,
    method: "GET",
    dataType: "json",
    data: "q=" + userInput + "&appid=" + APIKey,
    // if ajax call was successful
    success: function(data) {
      dataTrue = true;
      ajaxCall = data;
      city = data.name;
      date = data.dt;
      lat = data.coord.lat;
      long = data.coord.lon;
      iconImage = data.weather[0].icon;

      temp = data.main.temp;
      // converting temp to Fahrenheit
      temp = (temp - 273.15) * (9 / 5) + 32;
      temp = temp.toFixed(0);

      humidity = data.main.humidity;
      windSpeed = data.wind.speed;
      UVAjaxCall();
    },
    error: function(data) {
      responseTrue = false;
      console.log("Error!");

      alert("Error! Please enter a valid city name.");
    }
  });

  function UVAjaxCall() {
    console.log(lat + ", " + long);
    queryURL = "https://api.openweathermap.org/data/2.5/uvi?";
    $.ajax({
      url: proxy + queryURL,
      method: "GET",
      dataType: "json",
      data: "appid=" + APIKey + "&lat=" + lat + "&lon=" + long,
      // if ajax call was successful
      success: function(data) {
        responseTrue = true;
        uvIndex = data.value;
        ajaxCall = data;
        console.log(ajaxCall);
        displayWeatherData();
      },
      error: function() {
        responseTrue = false;
        console.log("Error! UV data not found.");
      }
    });
  }
  //Waits for AJAX call to end.
  function displayWeatherData() {
    if (responseTrue) {
      //Checks if the array is not empty and compares each item in the array with the current user input
      if (pastSearches.length > 0) {
        for (var i = 0; i < pastSearches.length; i++) {
          if (pastSearches[i] !== userInput) {
            pushToArray = true;
          } else {
            pushToArray = false;
            break;
          }
        }
        //If the array is empty, push the new user input
      } else {
        pushToArray = true;
      }

      if (pushToArray) {
        pastSearches.push(userInput);
        cityNames.push(city);
        pastSearchesObject = {
          pastSearches: pastSearches,
          cityNames: cityNames
        };
        let pastSearchesJSON = JSON.stringify(pastSearchesObject);
        localStorage.setItem("pastSearchesJSON", pastSearchesJSON);
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
        "https://openweathermap.org/img/wn/" + iconImage + "@2x.png"
      );

      tempSpan.text(temp + "°F");
      tempSpan.attr("class", "tempSpan");
      humiditySpan.text("Humidity: " + humidity + " %");
      humiditySpan.attr("class", "humiditySpan");
      windSpeedSpan.text("Wind speed: " + windSpeed);
      windSpeedSpan.attr("class", "windSpeedSpan");
      UVIndexSpan.text("UV Index: " + uvIndex);
      UVIndexSpan.attr("class", "UVIndexSpan");

      weatherDiv.append(citySpan);
      weatherDiv.append(dateSpan);
      weatherDiv.append(iconImgEL);
      weatherDiv.append(tempSpan);
      weatherDiv.append(humiditySpan);
      weatherDiv.append(windSpeedSpan);
      weatherDiv.append(UVIndexSpan);
      $(".lightBlueColor").append(weatherDiv);
    }
  }
}

$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  let userInput = $("#search").val();
  $("#search").val("");
  // Trims user input and replaces spaces with +.
  userInput = userInput.trim();
  userInput = userInput.toLowerCase();
  while (userInput.includes(" ")) {
    userInput = userInput.replace(" ", "+");
  }
  getWeather(userInput);
});

$(document).on("click", ".newButton", function(event) {
  event.preventDefault();
  let userInput = $(this).text();
  userInput = userInput.trim();
  userInput = userInput.toLowerCase();
  while (userInput.includes(" ")) {
    userInput = userInput.replace(" ", "+");
  }
  getWeather(userInput);
});

$("#clearSearchHistory").on("click", function(event) {
  event.preventDefault();
  localStorage.clear();
  updateButtons();
});

updateButtons();
