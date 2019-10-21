var APIKey = "1b1afd411484586400e59a0b2f0bbe81";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=South+Saint+Paul,US&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {});