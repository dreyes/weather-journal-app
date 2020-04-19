// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`running on localhost port: ${port}`);
})

// get projectData
app.get('/allData', (req, res) => {
  res.send(projectData);
})

// Adding data to the projectData object
app.post('/addData', (req, res) => {
  projectData.date = req.body.date;
  projectData.city = req.body.city;
  projectData.weather = req.body.weather;
  projectData.temperature = req.body.temperature;
  projectData.response = req.body.response;
  projectData.time = req.body.time;
  projectData.sunrise = req.body.sunrise;
  projectData.sunset = req.body.sunset;
})