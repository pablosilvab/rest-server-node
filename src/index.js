require('./config/config')

const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Habilitar carpeta public 
app.use(express.static(path.resolve(__dirname, './public')));

// Configuración routing
app.use(require('./routes/index'))

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log("BD Online");
    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT)
    console.log("Ambiente: ", process.env.NODE_ENV)
})