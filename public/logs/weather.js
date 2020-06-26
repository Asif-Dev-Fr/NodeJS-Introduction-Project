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
        // console.log(data_json);

        const weather = document.getElementById('weatherDegrees');
        weather.textContent = (Math.round(data_json.main.temp) / 10);

        const city = document.getElementById('weatherCity');
        city.textContent = data_json.name;

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
    // console.log(data);

    document.getElementById('hiddenData').style.display = "block";
    document.getElementById('searchedCity').textContent = data.name;
    document.getElementById('searchedDegree').textContent = data.main.temp;
}


const button = document.getElementById('searchButton');
button.addEventListener('click', search);

