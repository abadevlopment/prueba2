const socket = io.connect()

//PRODUCTOS
const agregarProducto = document.getElementById('agregarProducto')
agregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: agregarProducto[0].value,
        price: agregarProducto[1].value,
        thumbnail: agregarProducto[2].value
    }
    socket.emit('actualizar', producto)
    agregarProducto.reset()
})

socket.on('productos', productos => {
    console.log('resultado index socket');
    console.log(productos);
})

// socket.on('productos', productos => {
//     vistaTabla(productos).then(html => {
//         document.getElementById('listadoProductos').innerHTML = html
//     })
// })

// function vistaTabla(productos) {
//     return fetch('ListaProductos.hbs')
//         .then(res => res.text())
//         .then(resp => {
//             const plantilla = Handlebars.compile(resp)
//             // const html = plantilla({ productos })
//             const html = plantilla({
//                 Products: productos
//             })
//             return html
//         })
// }
