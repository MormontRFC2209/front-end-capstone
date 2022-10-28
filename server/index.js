require("dotenv").config();

const express = require("express");
const app = express();
const path = require('path');
const controllers = require('./controllers.js');
const configs = require('../config.js');
const axios = require('axios');
const compression = require('compression');


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(compression());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/info', (req, res) => {
  console.log('getwhat',req.query)
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
  // console.log('apiObject',apiObject)

  controllers.makePOSTAPICall(apiObject, (result, err) => {
    if (err) {
      console.log('error posting', err)
      return;
    }
    console.log('IT WORKS!')
    res.send(result)
  })
});


app.put('/info', (req, res) => {

  // console.log(req.body)
  var apiObject = [];
  apiObject.push({route: req.body.route});
  if (req.body.apiParams) {
    apiObject.push({params: req.body.apiParams})
  }

  // console.log(apiObject)

  controllers.makePUTAPICall(apiObject, (result, err) => {
    if (err) {
      console.log('error putting',err)
      return;
    }

    console.log('successful put')
    res.send(result)
  })
})

app.post('/image', (req, res) => {

  // console.log(req.body)
  var apiObject = [];
  apiObject.push({body: req.body});
  if (req.query.apiParams) {
    apiObject.push({params: req.query.apiParams})
  }

  controllers.makeImageAPIPOSTCall(apiObject, (result, err) => {
    if (err) {
      console.log('error posting image', err)
      return;
    }

    res.send(result)

  })
})




const PORT = process.env.PORT || 3000;


app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);






