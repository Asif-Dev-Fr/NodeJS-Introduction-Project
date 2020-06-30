if ('geolocation' in navigator) 
{
    console.log('Client side :  geolocation available');
    // position peut être changer par ce qu'on veut (value)
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // Retrieve data from server side :
        const api_url = `/weather/${lat},${lon}`;
        const response = await fetch(api_url);
        const data_json = await response.json();
        console.log(data_json);

        // Weather
        const weather = document.getElementById('weatherDegrees');
        weather.textContent = (Math.round(data_json.weatherData.main.temp) / 10);

        const city = document.getElementById('weatherCity');
        city.textContent = data_json.weatherData.name;

        document.getElementById('weatherDescription').textContent = data_json.weatherData.weather[0].main;

        // Air Quality :

        if(data_json.airQualityData.results.length != 0) 
        {
            const aqValue = document.getElementById('aqValue');
            aqValue.textContent = data_json.airQualityData.results[0].measurements[0].value;

            const aqUnit = document.getElementById('aqUnit');
            aqUnit.textContent = data_json.airQualityData.results[0].measurements[0].unit;

        } else 
        {
            document.getElementById('airQuality').style.display = "none"
        }
    } 
    )}
else 
{
    console.log('geolocation not available');
}

const search = async () => {
    const query = document.getElementById('findCity').value;
    // console.log(query);

    const api_url = `/city/${query}`;
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);

    document.getElementById('hiddenData').style.display = "block";
    if (typeof data.weatherQuery.main != "undefined") 
    {
        document.getElementById('searchedCity').textContent = `${data.weatherQuery.name} : `;
        document.getElementById('searchedDegree').textContent = `${data.weatherQuery.main.temp}°`;
        document.getElementById('searchedDescription').textContent = `(${data.weatherQuery.weather[0].main})`;

        if(data.airQualityQuery.results.length != 0) 
        {
            document.getElementById('aqValueQuery').textContent = data.airQualityQuery.results[0].measurements[0].value;

            if (document.getElementById('aqUnitQuery').style.display = "none") {
                document.getElementById('aqUnitQuery').style.display = "inline-block";
            }

            document.getElementById('aqUnitQuery').textContent = data.airQualityQuery.results[0].measurements[0].unit;            
        }
        else 
        {
            document.getElementById('aqValueQuery').textContent = 'Data not found';
            document.getElementById('aqUnitQuery').style.display = "none";
        }
    }
    else 
    { 
        document.getElementById('searchedCity').textContent = ' Pas de data ! Entrer le nom d\'une autre ville !';
        document.getElementById('searchedDegree').style.display = "none";
        document.getElementById('searchedDescription').style.display = "none";
    }


    // Send information back to the server to be able to send them in the database : 
    const lat = data.weatherQuery.coord.lat;
    const lon = data.weatherQuery.coord.lon;
    const weather = data.weatherQuery.main;
    const city = data.weatherQuery.name;
    const airQ = data.airQualityQuery.results[0].measurements[0];

    const dataSendToDB = {
        city,
        lat,
        lon,
        weather,
        airQ,
    }
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSendToDB),
    }

    const db_response = await fetch('/database', options);
    const db_json = await db_response.json();
    console.log(db_json);



}


const button = document.getElementById('searchButton');
button.addEventListener('click', search);

