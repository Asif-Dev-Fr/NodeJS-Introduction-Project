const express = require('express');

const app = express();
app.listen(3000, () => console.log('Listening at port 3000'));
app.use(express.static('public'));

// Send information from the client to the server :
app.use(express.json({limit: '1mb'}));
// Data sont envoyés depuis le client au server (post)
app.post('/api', (request, response) =>{
    console.log('Server side :')
    console.log(request.body);
    response.json({
        statut: 'success',
        latitude: request.body.lat,
        longitude: request.body.lon,
    });
});