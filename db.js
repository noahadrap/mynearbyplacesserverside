require('dotenv').config();
const { Pool } = require('pg');


let host = process.env.host;
let database = process.env.database;
let port = process.env.port;
let username = 'uzcktsnkpkkrnw';
let password = process.env.password;

let connectionString = 
`postgres://${username}:${password}@${host}:${port}/${database}`;

let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl : {rejectUnauthorized: false}
};

const pool = new Pool(connection);

let getPlaces = () => {
    console.log(connectionString)
    let sql = `select * from mynearbyplaces.businesses`
    return pool.query(sql)
    .then(result => result.rows);
}

let getReviews = () => {
    console.log(connectionString)
    let sql = `select * from mynearbyplaces.reviews`
    return pool.query(sql)
    .then(result => result.rows);
}

let savePlace = (name, address, image) => {
    console.log(connectionString)
    let sql = `insert into mynearbyplaces.businesses(name, image, address) values ($1, $2, $3)`;
    console.log(sql);
    return pool.query(sql, [name, image, address])
    .then(() => console.log('the place was saved'));
    
}

let saveReview = (place, name, review, rating) => {
    console.log(connectionString)
    let sql = `insert into mynearbyplaces.reviews(place, name, review, rating) values ($1, $2, $3, $4)`;
    return pool.query(sql, [place, name, review, rating])
    .then(() => console.log('the review was saved'))
    .catch(e => console.log(e));
}

module.exports = {getPlaces, getReviews, savePlace, saveReview}