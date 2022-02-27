const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const {optionsMDB} = require('./options/MariaDB.js')
const knexMDB = require('knex')(optionsMDB)
// const { optionsSQ3 } = require('./options/SQLite3.js')
// const knexSQL = require('knex')(optionsSQ3)

const Data = require('./api/DataBase.js')
const mdb = new Data(knexMDB, 'products')
// const sql3 = new Data(knexSQL, 'messages')

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})


io.on('connection', async (socket) => {
    console.log('Conectado !!!!!')
    
    //PRODUCTOS
    
    async function xdc () {
        let data = await mdb.getAll()
        console.log('resultado');
        console.log(data);
      }
    xdc()
    socket.emit('productos', mdb.getAll())

    socket.on('actualizar', async (producto) => {
        console.log(producto);
            await mdb.save(producto)
            // io.sockets.emit('productos', await mdb.getAll())
        })
})


const PORT = 8080 || process.env.PORT

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
