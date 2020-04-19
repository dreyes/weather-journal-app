/* Global Variables */
// API call api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const appKey = '&appid=0c06b64a967746465be5ea49569145c2';
const unitType = '&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const generateBtn = document.getElementById('generate');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

// On Click Event Listener
generateBtn.addEventListener('click', () => {
  requestWeather(baseURL, appKey, unitType)
    .then(function(weatherData){
      const weather = weatherData.weather[0].main;
      const temp = weatherData.main.temp;
      const city = weatherData.name;
      let userResponse = document.getElementById('feelings').value;
      postData('/addData', {date:newDate, city:city, weather:weather, temperature:temp, response:userResponse});
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
    console.log(newData);
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
    console.log(allData);
    dateDiv.innerHTML = allData.date;
    tempDiv.innerHTML = allData.temperature;
    contentDiv.innerHTML = allData.response;
  }catch(error) {
    console.log("error", error);
  }
}