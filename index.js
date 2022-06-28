const request = require('request');
const argv = require('yargs').argv;

let apiKey = '972807965dbc5286f976edd79b5d7045';
let city = argv.c || 'Kiev';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const kelvinToCelsius = require('kelvin-to-celsius');

function changeWeatherClass(weather) {
  let weatherClass = document.querySelector('.weather-icon');
  if (weather === 'cloud') {
    weatherClass.className = 'weather-icon ' + 'cloud';
  } else if (weather === 'sun') {
    weatherClass.className = 'weather-icon ' + 'sun';
  }
}

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body);
    let message = `It's ${kelvinToCelsius(weather.main.temp)} degrees in ${weather.name}!`;
    console.log(message);
    document.getElementById("name").innerHTML = weather.name;
    document.getElementById("temperature").innerHTML = kelvinToCelsius(weather.main.temp);
    changeWeatherClass(weather.status);
  }
});