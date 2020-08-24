const express = require('express');
const { verificaToken } = require('../middlewares/auth.js');

let app = express();

let Producto = require('../models/producto');

// ============
// Get All
// ============
app.get('/producto', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    Producto.find({})
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            Producto.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    conteo
                })
            });


        });

});

// ============
// Get By ID
// ============
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findOne({ _id: id })
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre')
        .exec((err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            })
        });
});


// ============
// Create 
// ============
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;



    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    });





});


// ============
// Update name
// ============
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let producto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    };

    Producto.findByIdAndUpdate(
        id,
        producto, { new: true, runValidators: true },
        (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })

        });
});


// ============
// Delete
// ============
app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    req.body.disponible = 'false';


    // Borrado logico
    Producto.findByIdAndUpdate(id, req.body, { new: true }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    messaje: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    });

});


app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i')

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }



            res.json({
                ok: true,
                productos
            });


        });

});

module.exports = app;