/* Global Variables */
// API call api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const appKey = '&appid=0c06b64a967746465be5ea49569145c2';
const unitType = '&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Global Variables
const generateBtn = document.getElementById('generate');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const weatherDiv = document.getElementById('weather');
const cityDiv = document.getElementById('city');
const contentDiv = document.getElementById('content');

// On Click Event Listener
generateBtn.addEventListener('click', () => {
  requestWeather(baseURL, appKey, unitType)
    .then(function(weatherData){
      const weather = weatherData.weather[0].id;
      const temp = weatherData.main.temp;
      const city = weatherData.name;
      const currentTime = weatherData.dt;
      const sunrise = weatherData.sys.sunrise;
      const sunset = weatherData.sys.sunset;
      let userResponse = document.getElementById('feelings').value;
      postData('/addData', {date:newDate, city:city, weather:weather, temperature:temp, response:userResponse, time:currentTime, sunrise:sunrise, sunset:sunset});
    })
    .then(function() {
      updateUI();
    })
});

// Resquest data from Weather API
const requestWeather = async (baseURL, appKey, unitType) => {
  let zipCode = document.getElementById('zip').value;
  const request = await fetch(baseURL+zipCode+appKey+unitType);
  try {
    const weatherData = await request.json();
    return weatherData;
  }catch(error) {
    console.log("error", error);
  }
};

// Send data to the server
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("error", error);
  }
}

// Retrieve data from server and update UI
const updateUI = async (url = '') => {
  const request = await fetch('/allData')
  try{
    const allData = await request.json();
    dateDiv.innerHTML = `${allData.city}, ${allData.date}`;
    tempDiv.innerHTML = allData.temperature + " °C";
    const x = allData.weather;
    switch (true){
      case (x < 300):
        // Thunderstorm
        weatherDiv.style.backgroundImage = "url('images/thunderstorm.png')";
        break;
      case (x < 600):
        // Rain
        weatherDiv.style.backgroundImage = "url('images/rainy.png')";
         break;
      case (x < 700):
        // Snow
        weatherDiv.style.backgroundImage = "url('images/snowy.png')";
        break;
      case (x < 800):
        // Mist
        weatherDiv.style.backgroundImage = "url('images/mist.png')";
        break;
      case (x < 801):
        // Clear
        if (allData.time >= allData.sunrise && allData.time < allData.sunset) {
          weatherDiv.style.backgroundImage = "url('images/clear_d.png')";
        } else{
          weatherDiv.style.backgroundImage = "url('images/clear_n.png')";
        }
        break;
      case (x < 802):
        // Partially Clouded
        if (allData.time >= allData.sunrise && allData.time < allData.sunset) {
          weatherDiv.style.backgroundImage = "url('images/partially_cloudy_d.png')";
        } else{
          weatherDiv.style.backgroundImage = "url('images/partially_cloudy_n.png')";
        }
        break;
      case (x > 801):
        // Cloudy
        weatherDiv.style.backgroundImage = "url('images/cloudy.png')";
        break;
    }
    contentDiv.innerHTML = allData.response;
  }catch(error) {
    console.log("error", error);
  }
}