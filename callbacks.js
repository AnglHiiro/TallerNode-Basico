const fs = require('fs')

function leerArchivo(nombreArchivo, callback) {
    fs.readFile(nombreArchivo, 'utf-8', (error, contenido) => {
        if(error){
            callback(error, null)
        }else{
            callback(null, contenido)
        }
    })
}

function mostrarMensaje(error, contenido) {
    if(error){
        console.log('Error: ', error);
    }else{
        console.log('Contenido del archivo: ', contenido);
    }
}

leerArchivo('prueba.txt', mostrarMensaje)