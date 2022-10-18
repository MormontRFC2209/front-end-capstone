const axios = require('axios');
const ImageKit = require("imagekit");
const configs = require('../config.js');

var imagekit = new ImageKit({
  publicKey: configs.publicKey,
  privateKey: configs.privateKey,
  urlEndpoint : configs.urlEndpoint
})





module.exports.makeGETAPICall = (apiObject, callback) => {

  var route = configs.apiServer + apiObject[0].route

  if(apiObject[1]) {

    var kvPair = apiObject[1].params
    axios.get(route, {headers: {Authorization: configs.token}, params: kvPair} )
    .then((result) => {
      callback(result.data, null)
    })
    .catch((error) => {
      callback(null, error)
    })

  } else {

    axios.get(route, {headers: {Authorization: configs.token}})
      .then((result) => {
        callback(result.data, null)
      })
      .catch((error) => {
        callback(null, error)
      })
  }


}

module.exports.makePOSTAPICall = (apiObject, callback) => {

  var route = configs.apiServer + apiObject[0].route
  var bodyObject = apiObject[1].body

  if(apiObject[2]) {

    var paramsObject = apiObject[2].params

    axios.post(route, kvPair ,{headers: {Authorization: configs.token}, params: paramsObject})
      .then((result) => {
        callback(result.data, null)
      })
      .catch((error) => {
        callback(null, error)
      })


  } else {

    axios.post(route, bodyObject ,{headers: {Authorization: configs.token}})
    .then((result) => {
      callback(result.data, null)
    })
    .catch((error) => {
      callback(null, error)
    })

  }



}

module.exports.makePUTAPICall = (apiObject, callback) => {
  var route = configs.apiServer + apiObject[0].route

  if(apiObject[1]) {

    var kvPair = apiObject[1].params
    axios.put(route, {headers: {Authorization: configs.token}, params: kvPair} )
    .then((result) => {
      callback(result.data, null)
    })
    .catch((error) => {
      callback(null, error)
    })

  } else {

    axios.put(route, {headers: {Authorization: configs.token}})
      .then((result) => {
        callback(result.data, null)
      })
      .catch((error) => {
        callback(null, error)
      })
  }
}

module.exports.makeImageAPIPOSTCall = (apiObject, callback) => {


  var base64Img = apiObject.body.base64Img;
  var nameGiven = apiObject.body.nameGiven;





  imagekit.upload({
    file: base64Img,
    fileName: nameGiven,
    tags: ["MVPRetail"]
  }, function(error, result) {
    if(error) callback(null, error);
    else callback(result,null)
  })
}