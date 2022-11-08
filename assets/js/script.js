let apiKey = "ee1f6948d84bae371ee48ac553b29b00";
let searchButton = $(".searchButton");
let searchInput = $(".searchInput");

//Left
let cityNameEl = $(".cityName");
let currentDateEl = $(".currentDate");
let weatherIconEl = $(".weatherIcon");
let searchHistoryEl = $(".historyItems");

//Right
let tempEl = $(".temp");
let humidityEl = $(".humidity");
let windSpeedEl = $(".windSpeed");
let uvIndexEl = $(".uvIndex");
let cardRow = $(".cardRow");

// Current date var
var today = new Date();
let dd = String(today.getDate()).padStart(2,"0");
let mm = String(today.getMonth() + 1).padStart(2,"0");
let yyyy = today.getFullYear();
var today = mm + "/" + dd + "/" + yyyy;