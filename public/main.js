
// P5.js 
/*
setup = () => {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320,240);
  video.loadPixels();
  const image64 = video.canvas.toDataURL(); 
}
*/

if ('geolocation' in navigator) {
    console.log('Client side :  geolocation available');
    // position peut être changer par ce qu'on veut (value)
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        console.log(`Client side : Latitude est de ${position.coords.latitude} et la longitude est de ${position.coords.longitude}`);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const timestamp = new Date(position.timestamp);

        const buttonSendToServer = document.getElementById('sendToServer');
        buttonSendToServer.addEventListener('click', async () => {

            // Champs name : 
            const nameWritten = document.getElementById('name');
            const name = nameWritten.value;
            // console.log(name);

            // envoyer les datas depuis le client au server : 
            const data = { lat, lon, timestamp, name };
            // Supplying request option : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }

            // fonction fetch() :
            const response = await fetch('/api', options);
            const json_data = await response.json();
            console.log(json_data);

        })

        // Champ lat, long, timestamp :
        const button = document.getElementById('search');
        button.addEventListener('click', function () {
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            document.getElementById('timestamp').textContent = timestamp;
        });
    })
} else {
    console.log('geolocation not available');
}