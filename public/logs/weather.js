if ('geolocation' in navigator) {
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

        const weather = document.getElementById('weatherDegrees');
        weather.textContent = (Math.round(data_json.main.temp) / 10);

        const city = document.getElementById('weatherCity');
        city.textContent = data_json.name;

        document.getElementById('weatherDescription').textContent = data_json.weather[0].main

    } 
    )}
else {
    console.log('geolocation not available');
}

const search = async (event) => {
    const query = document.getElementById('findCity').value;
    // console.log(query);

    const api_url = `/city/${query}`;
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);

    document.getElementById('hiddenData').style.display = "block";
    if (typeof data.main != "undefined") {
        document.getElementById('searchedCity').textContent = data.name;
        document.getElementById('searchedDegree').textContent = data.main.temp;
        document.getElementById('searchedDescription').textContent = data.weather[0].main;
    }
    else { 
        document.getElementById('searchedCity').textContent = 'Entrer le nom d\'une ville';
    }
}


const button = document.getElementById('searchButton');
button.addEventListener('click', search);

