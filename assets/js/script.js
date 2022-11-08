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
function renderSearchHistory(cityName) {
    searchHistoryEl.empty();
    let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (let i = 0; i < searchHistoryArr.length; i++) {
        // newListItem in loop because otherwise the text of the li element changes, rather than making a new element for each array index
        let newListItem = $("<li>").attr("class", "historyEntry");
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(newListItem);
    }
}
// defines Weather Data for a selected city
function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
    cityNameEl.text(cityName)
    currentDateEl.text(`(${today})`)
    tempEl.text(`Temperature: ${cityTemp} °F`);
    humidityEl.text(`Humidity: ${cityHumidity}%`);
    windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndexEl.text(`UV Index: ${uvVal}`);
    weatherIconEl.attr("src", cityWeatherIcon);
}
// get wether via ajax api
function getWeather(desiredCity) {
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(weatherData) {
        let cityObj = {
            cityName: weatherData.name,
            cityTemp: weatherData.main.temp,
            cityHumidity: weatherData.main.humidity,
            cityWindSpeed: weatherData.wind.speed,
            cityUVIndex: weatherData.coord,
            cityWeatherIconName: weatherData.weather[0].icon
        }
    let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`
    $.ajax({
        url: queryUrl,
        method: 'GET'
    })
    .then(function(uvData) {
          if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
              let searchHistoryArr = [];
              // Keeps user from adding the same city to the searchHistory array list more than once
              if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                  searchHistoryArr.push(cityObj.cityName);
                  // store our array of searches and save 
                  localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                  let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                  renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                  renderSearchHistory(cityObj.cityName);
              }else{
                  console.log("City already in searchHistory. Not adding to history list")
                  let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                  renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
              }
          }else{
              let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
              // Keeps user from adding the same city to the searchHistory array list more than once
              if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                  searchHistoryArr.push(cityObj.cityName);
                  // store array of searches and save 
                  localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                  let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                  renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                  renderSearchHistory(cityObj.cityName);
              }else{
                  console.log("City already in searchHistory. Not adding to history list")
                  let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                  renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
              }
          }
      })  
      });
}
