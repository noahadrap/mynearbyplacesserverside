const express = require('express')
const cors = require('cors')
const data = require('./data');
const app = express();
const port = process.env.PORT || 4002;
const db = require('./db');


app.use(express.json());
app.use(cors());

app.get('/places', (request, response) => {
    db.getPlaces()
    .then(places => response.json(places))
    .catch(e => {console.log(e); response.status(500).send('there was an error in getting places')})
 });

 app.get('/reviews', (request, response) => {
    db.getReviews()
    .then(places => response.json(places))
    .catch(e => {console.log(e); response.status(500).send('there was an error in getting reviews')})

 });

 app.post('/addPlace', (request, response) => {
   db.savePlace(request.body.name, request.body.address, request.body.image)
   .then(places => response.json(places))
   .catch(e => {console.log(e); response.status(500).send('there was an error in saving the place')})
    


});

app.post('/deletePlace', (request, response) => {
   db.deletePlace(request.body.id)
   .then(places => response.json(places))
   .catch(e => {console.log(e); response.status(500).send('there was an error in delete the place')})
    


});

app.post('/editPlace', (request, response) => {
   db.editPlace(request.body.name, request.body.address, request.body.image, request.body.id)
   .then(places => response.json(places))
   .catch(e => {console.log(e); response.status(500).send('there was an error in delete the place')})
    


});

 app.get('/', (request, response) => {
    response.send("Welcome to mynearbyplaces server side");
 });
app.listen(port, () => console.log("listening on port " + port))