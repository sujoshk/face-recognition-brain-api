const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');;

var PORT = normalizePort(process.env.PORT || '3000');
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => { res.send('it is working') });
app.post('/signin', (req,res) => {signIn.handleSignIn(req,res,db,bcrypt)} );
app.post('/register', (req,res) => {register.handleRegister(req,res, db, bcrypt)} );
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)} );
app.put('/image', (req,res) => {image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)} );

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});



// All this is so cool