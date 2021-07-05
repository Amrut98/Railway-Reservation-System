const express = require('express');
const mongoose = require('mongoose');
const controlleradmin = require('./controllers/controller');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios")
const app = express();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const user = require("./model/User");
const cookieParser = require('cookie-parser');

// view engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());



app.use(bodyParser.json());

// enable cors to the server
const corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work





// database connection
const dbURI = 'mongodb+srv://Amrut1998:Amrut1998@cluster0.y38he.mongodb.net/AdminFun?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(4002))
    .catch((err) => console.log(err));
console.log('Port 4002');
controlleradmin(app);
module.exports = app;

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Railway Reservation',
            description: 'Railway Reservation info',
            contact: {
                name: 'AmrutK'
            },
            servers: ["http://localhost:4002"]

        }
    },
    apis: ['controllers/controller.js']

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));