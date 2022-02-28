const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { optionsMDB } = require('./options/MariaDB.js')
const knexMDB = require('knex')(optionsMDB)
const { optionsSQ3 } = require('./options/SQLite3.js')
const knexSQL = require('knex')(optionsSQ3)

const Data = require('./api/DataBase.js')
const mdb = new Data(knexMDB, 'products')
const sql3 = new Data(knexSQL, 'messages')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})
//PRUEBAS
// async function xdc () {
//     let data = await mdb.getAll()
//     console.log('resultado tabla');
//     console.log(data);
//     // return data
// }
// xdc()
async function xdf() {
    let data = await sql3.getAll()
    console.log('resultado mensajes');
    console.log(data);
    // return data
}
xdf()

//SOCKET
io.on('connection', async (socket) => {
    console.log('Conectado !!!!!')

    //PRODUCTOS
    socket.emit('productos', await mdb.getAll())

    socket.on('actualizar', async (producto) => {
        // console.log('guardado producto');
        // console.log(producto);
        mdb.save(producto)
        io.sockets.emit('productos', await mdb.getAll())
    })

    //MENSAJES
    socket.emit('mensajes', await sql3.getAll())

    socket.on('mensajeNuevo', async (mensaje) => {
        // console.log('guardado mensaje');
        // console.log(mensaje);
        mensaje.fyh = new Date().toLocaleString()
        sql3.save(mensaje)
        io.sockets.emit('productos', await sql3.getAll())
    })
})


const PORT = 8080 || process.env.PORT

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
