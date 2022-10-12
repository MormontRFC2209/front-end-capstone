require("dotenv").config();

const express = require("express");
const path = require("path");
const controllers = require("./controllers.js");
const configs = require('../config.js');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

//ROUTES
app.get('/info', (req, res) => {
  axios.get(`${configs.apiServer}/products`, {headers: {Authorization: configs.token}})
    .then((infoFromGet) => res.send(infoFromGet.data))
    .catch((err) => console.log(err))
});




const PORT = process.env.PORT || 3000;


app.listen(PORT);
console.log(`Serverlistening at http://localhost:${PORT}`);






