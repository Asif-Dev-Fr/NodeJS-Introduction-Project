const express = require('express');
// BDD : 
const Datastore = require('nedb');
const { request, response } = require('express');

// Dotenv : 
require('dotenv').config();

// fetch : 
const fetch = require('node-fetch');

const app = express();
app.listen(3000, () => console.log('Listening at port 3000'));
app.use(express.static('public'));

const database = new Datastore('database.db');
// création db
database.loadDatabase();

// Send information from the client to the server :
app.use(express.json({limit: '1mb'}));
// Data sont envoyés depuis le client au server (post)
app.post('/api', (request, response) =>{
    console.log('Server side :')
    console.log(request.body);
    // insertion en bdd : 
    database.insert(request.body);
    // console.log(database);
    response.json({
        statut: 'success',
        latitude: request.body.lat,
        longitude: request.body.lon,
        timestamp: request.body.timestamp,
        name: request.body.name
    });
});

// Display the information on all-data.html :
app.get('/getAllData', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            console.log(err);
            response.end();
            return
        } else {
            response.json(data);
        }
    });
});

// Retrieve data from API on the server site : 
    // Add API KEY with lat and lon to find the weather here : 
    app.get('/weather/:latlon', async (request, response) => {
        // console.log(request); 

        const latlon = request.params.latlon.split(',');
        // console.log(latlon);
        const lat = latlon[0];
        const lon = latlon[1];

        const api = {
            key: process.env.API_KEY,
            base: process.env.BASE
        }
        // Weather API
        const fetch_response = await fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}`);
        const json_data = await fetch_response.json();

        // Air Quality API : 
        const aq_response = await fetch(`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`);
        const aq_data = await aq_response.json();

        // Envoie des datas des 2 API :
        const allData = {
            weatherData : json_data,
            airQualityData : aq_data
        }

        response.json(allData);

    });
        

    app.get('/city/:query', async (request, response) => {

        const query = request.params.query;

        const api = {
            key: process.env.API_KEY,
            base: process.env.BASE
        }

        // Weather :
        const weather_api = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;
        const weather_response = await fetch(weather_api);
        const weather_data = await weather_response.json();


        // Air Quality :
        const airQuality_api = `https://api.openaq.org/v1/latest?city=${query}`;
        const airQuality_response = await fetch(airQuality_api);
        const airQuality_data = await airQuality_response.json();

        const data = {
            weatherQuery : weather_data,
            airQualityQuery : airQuality_data
        }
        response.json(data)
    });


            
