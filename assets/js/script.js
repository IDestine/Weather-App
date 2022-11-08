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
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
var today = mm + "/" + dd + "/" + yyyy;

// Local storage for historyItems
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
  console.log("searchHistory not found");
  //if it does not return null render searchHistory
} else {
  console.log("searchHistory loaded into searchHistoryArr");
  renderSearchHistory();
}
searchButton.on("click", function (e) {
  e.preventDefault();
  if (searchInput.val() === "") {
    alert("You must enter a city");
    return;
  }
  console.log("clicked button");
  getWeather(searchInput.val());
});
$(document).on("click", ".historyEntry", function () {
  console.log("clicked history item");
  let thisElement = $(this);
  getWeather(thisElement.text());
});
// search history detail per city
