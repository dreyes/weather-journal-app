/* Global Variables */
// API call api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const appKey = '&appid=0c06b64a967746465be5ea49569145c2';
const unitType = '&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const generateBtn = document.getElementById('generate')

generateBtn.addEventListener('click', () => {
  requestWeather(baseURL, appKey, 32095,);
})
const requestWeather = async (baseURL, appKey, zipCode, unitType) => {
  const request = await fetch(baseURL+zipCode+appKey+unitType);
  try {
    const weatherData = await request.json();
    console.log(weatherData);
  }catch(error) {
    console.log("error", error);
  }
};