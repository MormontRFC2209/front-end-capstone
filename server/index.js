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

  var apiObject = [];
  apiObject.push({route: req.query.route});
  if (req.query.apiParams) {
    apiObject.push({params: req.query.apiParams})
  }

  controllers.makeGETAPICall(apiObject, (result, err) => {
    if (err) {
      console.log('error retrieving data')
      return;
    }
    res.send(result)
  })
});

app.post('/info', (req, res) => {

  var apiObject = [];
  apiObject.push({route: req.query.route});
  apiObject.push({body: req.body});
  if (req.query.apiParams) {
    apiObject.push({params: req.query.apiParams})
  }

  controllers.makePOSTAPICall(apiObject, (result, err) => {
    if (err) {
      console.log('error posting')
      return;
    }
    console.log('IT WORKS!')
    res.send(result)
  })
});




const PORT = process.env.PORT || 3000;


app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);






