import 'dotenv/config';
import jwt from 'jsonwebtoken';
import path from 'path';
const approutes = require('./routes/index');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

console.log('Hello Node.js project.');

console.log(process.env.MY_SECRET);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    req.user = undefined;
    next();
  }
  else {
    token = token.replace('bearer', '');
    jwt.verify(token, 'llp', (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  }
});



app.use('/api', approutes);



app.get('/', (req, res) => {
  return res.send('Welcome to Scion Restful API');
});

app.get('/api', (req, res) => {
  return res.send('Congragulation!, Scion Restful API is working');
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

