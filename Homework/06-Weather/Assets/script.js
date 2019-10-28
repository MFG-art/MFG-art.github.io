// Variable used to store user input
var pastSearches = [];
var cityNames = [];
var pushToArray = false;
var pastSearchesObject = {};

// Variables used for displaying current weather info
var city, date, iconImage, temp, humidity, windSpeed, uvIndex;
var responseTrue;

updateButtons();

// If past search results are stored locally, this will pull up weather information for the most recent search.
if (localStorage.getItem("pastSearchesJSON") !== null) {
  pastSearchesObject = JSON.parse(localStorage.getItem("pastSearchesJSON"));
  let userInput = pastSearchesObject.pastSearches[pastSearches.length - 1];
  getWeather(userInput);
}

// Empties gray column on left side of screen. Updates new buttons based on pastSearchesJSON
function updateButtons() {
  $(".grayColor").empty();
  if (localStorage.getItem("pastSearchesJSON") !== null) {
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
  var APIKey = "&appid=1b1afd411484586400e59a0b2f0bbe81";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + APIKey;
  var lat, long;

  // this first ajax call gets the current weather information
  $.ajax({
    url: queryURL,
    method: "GET",

    success: function(data) {
      responseTrue = true;
    },
    error: function(data) {
      responseTrue = false;
      alert("Error! Please enter a valid city name.");
    }
  }).then(function(response) {
    //if call was successful, do this.
    if (responseTrue) {
      city = response.name;
      date = response.dt;
      lat = response.coord.lat;
      long = response.coord.lon;
      iconImage = response.weather[0].icon;

      temp = response.main.temp;
      // converting temp to Fahrenheit
      temp = (temp - 273.15) * (9 / 5) + 32;
      temp = temp.toFixed(0);

      humidity = response.main.humidity;
      windSpeed = response.wind.speed;
    }
  });

  // UV Index
  setTimeout(function() {
    queryURL =
      "http://api.openweathermap.org/data/2.5/uvi" +
      APIKey +
      "&lat=" +
      lat +
      "&lon=" +
      long;

    // This ajax call gets the UV index
    $.ajax({
      url: queryURL,
      method: "GET",
      // if ajax call was successful
      success: function(data) {
        responseTrue = true;
        uvIndex = data.value;
      },
      error: function(data) {
        responseTrue = false;
      }
    });
  }, 300);

  // For Five Day Weather Forecast
  setTimeout(function() {
    console.log(lat + ", " + long);
    var queryURL =
      "api.openweathermap.org/data/2.5/forecast?&appid=" +
      APIKey +
      "&lat=" +
      lat +
      "&lon=" +
      long;
    $.ajax({
      url: queryURL,
      method: "GET",
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log("Error.");
      }
    });
  }, 300);

  //Waits for AJAX call to end.
  setTimeout(function() {
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

      // Push user input and city name to their respective arrays if the right conditions are met
      if (pushToArray) {
        pastSearches.push(userInput);
        cityNames.push(city);
        //This object is used to contain our searches and city names
        pastSearchesObject = {
          pastSearches: pastSearches,
          cityNames: cityNames
        };
        // Object storing needed data is saved to local storage and button display is updated
        let pastSearchesJSON = JSON.stringify(pastSearchesObject);
        localStorage.setItem("pastSearchesJSON", pastSearchesJSON);
        updateButtons();
      }

      // creating elements used to display current forecast
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
      UVIndexSpan.text("UV Index: " + uvIndex);
      UVIndexSpan.attr("class", "UVIndexSpan");

      //Appending elements to rightmost column
      weatherDiv.append(citySpan);
      weatherDiv.append(dateSpan);
      weatherDiv.append(iconImgEL);
      weatherDiv.append(tempSpan);
      weatherDiv.append(humiditySpan);
      weatherDiv.append(windSpeedSpan);
      weatherDiv.append(UVIndexSpan);
      $(".lightBlueColor").append(weatherDiv);
    }
  }, 700);
}

// when the submit button is clicked or the enter key is pressed
$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  let userInput = $("#search").val();
  // Trims user input and replaces spaces with +.
  userInput = userInput.trim();
  userInput = userInput.toLowerCase();
  while (userInput.includes(" ")) {
    userInput = userInput.replace(" ", "+");
  }
  getWeather(userInput);
});

// when a search history button is clicked, calls getWeather() with the name of the button, formatted to match other data in array
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

// clears local storage and updates button display
$("#clearSearchHistory").on("click", function(event) {
  event.preventDefault();
  localStorage.clear();
  updateButtons();
});

updateButtons();
