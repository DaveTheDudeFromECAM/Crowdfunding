// Import express & cors
let express = require('express');
let cors = require('cors')

// Initialize the app 
let app = express();

app.use(express.json());
app.use(cors());

// Importing the database model & table init
const Sequelize = require('sequelize')
const db = require('./database.js');
db.sync()

let router = require('./routes');
app.use("/", router)

 // Launch app to listen to specified port
app.listen(5000, function () {
    console.log('Runnings on port 5000');
})