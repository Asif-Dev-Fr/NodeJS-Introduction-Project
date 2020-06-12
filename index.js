const express = require('express');
// BDD : 
const Datastore = require('nedb');

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
    // console.log(request.body);
    // insertion en bdd : 
    database.insert(request.body);
    console.log(database);
    response.json({
        statut: 'success',
        latitude: request.body.lat,
        longitude: request.body.lon,
        timestamp: request.body.timestamp
    });
});