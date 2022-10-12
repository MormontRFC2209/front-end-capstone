require("dotenv").config();


const express = require("express");
const path = require("path");
const controllers = require("./controllers.js");





const app = express();
app.use(express.json());


//MIDDLE WARE

//ROUTES




const PORT = process.env.PORT || 3000;


app.list(PORT);
console.log(`Serverlistening at http://localhost:${PORT}`);






