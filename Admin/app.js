const express = require('express');
const mongoose = require('mongoose');
const trainsController = require('./controllers/controller');
const trainRoutes = require('./routes/trainRoutes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')


const options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Train Management API",
            version: "1.0.0",
            description: "A Train Management API",
        },
        servers: [{
            url: "http://localhost:4001",
        }, ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.use(cors());
app.use(morgan("dev"));

app.use(cookieParser())
app.use(bodyParser.json())

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
    .then((result) => app.listen(4001))
    .catch((err) => console.log(err));
console.log('Port 4001');


app.use(trainRoutes);


module.exports = app;


// module.exports = { trainRoutes: trainRoutes }