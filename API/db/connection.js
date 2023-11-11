const mysql = require('mysql')
const config = require('./config');

const pool = mysql.createConnection(config, (err) => {
    if(err){
        console.log("[SERVIDOR]: ERROR: No se pudo conectar a la bd: " + err.message);
        connectDB()
    }
    console.log("[SERVIDOR]: Conexion exitosa");
})

let connectDB = () => {
    setTimeout(() => {
        pool.getConnection((err) => {
            if(err){
                console.log("[SERVIDOR]: ERROR: No se pudo conectar a la bd: " + err.message);
                connectDB()
            }
            console.log("[SERVIDOR]: Conexion exitosa");
        })
    }, 3000)
}


module.exports = {
    pool, mysql
}