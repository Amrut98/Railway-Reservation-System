const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
const axios = require("axios");
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());





const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// enable cors to the server
const corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt));

//Extended https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'Railways',
            description: 'Railway Reservation System',
            contact: {
                name: "AmrutK"
            },
            servers: ["http://localhost:4000"]
        }
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));











// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Amrut1998:Amrut1998@cluster0.y38he.mongodb.net/AuthenticFun?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

// routes

app.get('/', (req, res) => { res.send('connected') });



app.use(routes);

module.exports = {
    app,
    routes
}