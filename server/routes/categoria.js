const express = require('express');
const { verificaToken } = require('../middlewares/auth.js');

let app = express();

let Categoria = require('../models/categoria');

// ============
// Get All
// ============
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({}, 'descripcion usuario')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    conteo
                })
            });
        });

});

// ============
// Get By ID
// ============
app.get('/categoria/:id', verificaToken, (req, res) => {

});


// ============
// Create 
// ============
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: body.usuario
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });

    console.log(categoria);




});


// ============
// Update name
// ============
app.put('/categoria/:id', verificaToken, (req, res) => {

});


// ============
// Delete
// ============
app.delete('/categoria/:id', verificaToken, (req, res) => {
    // only admin and token
});

module.exports = app;