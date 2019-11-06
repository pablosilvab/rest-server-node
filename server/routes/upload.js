const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: 'false',
            message: 'No se ha seleccionado ningún archivo.'
        });
    }

    // Valida tipo
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El tipos permitidos son ' + tiposValidos
            }
        });
    }

    let archivo = req.files.archivo;
    let nombreArchivo = archivo.name.split('.');
    let extension = nombreArchivo[nombreArchivo.length - 1]

    // Validar extension
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El archivo no es una imagen.'
            }
        });
    }


    // Nombre unico para el archivo
    let nombreImagen = `${id}-${new Date().getMilliseconds()}.${extension}`;


    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombreImagen}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Imagen cargada.
        switch (tipo) {
            case 'usuarios':
                imagenUsuario(id, res, nombreImagen);
            case 'productos':
                imagenProducto(id, res, nombreImagen);
        }
    });
});

function imagenUsuario(id, res, nombreImagen) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            eliminarArchivo(nombreImagen, usuarioDB.img);

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            eliminarArchivo('usuarios', usuarioDB.img);

            return res.status(400).json({

                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        eliminarArchivo('usuarios', usuarioDB.img);

        usuarioDB.img = nombreImagen;
        usuarioDB.save((err, usuarioNew) => {
            res.json({
                ok: true,
                usuario: usuarioNew
            });
        });


    });
}

function imagenProducto(id, res, nombreImagen) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            eliminarArchivo(nombreImagen, productoDB.img);

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            eliminarArchivo('productos', productoDB.img);

            return res.status(400).json({

                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            });
        }

        eliminarArchivo('productos', productoDB.img);

        productoDB.img = nombreImagen;
        productoDB.save((err, productoNew) => {
            res.json({
                ok: true,
                producto: productoNew
            });
        });


    });
}

function eliminarArchivo(tipo, nombreImagen) {
    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
}

module.exports = app;