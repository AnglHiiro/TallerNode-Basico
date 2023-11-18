require('dotenv').config()
const mysql = require('mysql')

const credentials = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_DATABASE || 'NOTAS',
    insecureAuth: true
}

const pool = mysql.createPool(credentials, (err) => {
    if(err){
        console.log('[DB]: Error, intentando conectarse.');
        console.log(err);
        connectDB()
    }else{
        var date = new Date()
        console.log('[DB]: Conectado a la base de datos ' + date.toLocaleString());
    }
})

let connectDB = () => {
    setTimeout(() => {
        pool.getConnection((err, connection) => {
            if(err){
                console.log('[DB]: Error, intentando conectarse.');
                console.log(err);
                connectDB()
            }else{
                var date = new Date()
                console.log('[DB]: Conectado a la base de datos ' + date.toLocaleString());
            }
        }, 2000)
    })
}

module.exports = {
    pool, mysql
}