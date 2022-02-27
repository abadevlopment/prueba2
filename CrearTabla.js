const { optionsMDB } = require('./options/MariaDB.js')
const knexMDB = require('knex')(optionsMDB)

knexMDB.schema.createTable('products', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('thumbnail').notNullable()
    table.integer('price').notNullable()
}).then(()=>{
    console.log('table products created')
}).catch((err)=>{
    console.log(err)
    throw err
}).finally(()=>{
    knexMDB.destroy()
})

const { optionsSQ3 } = require('./options/SQLite3.js')
const knexSQL = require('knex')(optionsSQ3)

knexSQL.schema.createTable('messages', table => {
    table.increments('id').primary()
    table.string('author').notNullable()
    table.string('fyh').notNullable()
    table.string('message').notNullable()
}).then(()=>{
    console.log('table messages created')
}).catch((err)=>{
    console.log(err)
    throw err
}).finally(()=>{
    knexSQL.destroy()
})