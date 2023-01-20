const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Adding line of text to update serve location

const db =  knex({
    client: 'pg',
    connection: {
      host : 'dpg-cf4menpgp3js6fk37vng-a', //localhost
      user : 'jory', //add your user name for the database here
      port: 5432, // add your port number here
      password : 'Qfu1GOKkUzdaEKaEBRyxpnqi936vdHLP', //add your correct password in here
      database : 'main_k3t6' //add your database name you created here
    }
});


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success')
});


app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImagePut(req, res, db) });

app.post('/imageURL', (req, res) => { image.handleApiCall(req, res,) });



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(process.env.PORT || 3000, () => {
    console.log('app is running')
});

// sign in --> POST = success/fail
// register --> POST = user
// profile/:userId --> GET = user
// image --> PUT --> user