const mymap = L.map('mapid').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);



getWeatherEntries = async () => {
    const response = await fetch('/getWeatherEntries');
    const data = await response.json();
    // console.log(data);

    data.map(result => {
        const marker = L.marker([result.lat, result.lon]).addTo(mymap);

        let txt = `The weather here at ${result.city} (${result.lat}&deg;,
        ${result.lon}&deg;) is ${result.sky} with
        a temperature of ${result.weather.temp}&deg; C.`;

        if(result.airQ == 'undefined') {
            txt += 'No air quality reading for this location.'
        } else {
            txt += `The concentration of particulate matter 
            (${result.airQ.parameter}) is ${result.airQ.value} 
            ${result.airQ.unit} last read on ${result.airQ.lastUpdated}`;
        }

        marker.bindPopup(txt);
    });


}


getWeatherEntries();