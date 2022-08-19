

const server = require("./src/app.js");
const { conn, Products } = require("./src/db.js");
const infoDB = require("./src/infoDB/infoDB.json")

async function chargeDb() {
    let filtrado = infoDB.productos.map(el => {
        return {
            background_image: el.background_image,
            marca: el.marca,
            modelo: el.modelo,
            precio: el.precio,
            description: el.description,
            bentchmark: el.bentchmark,
            especificaciones: el.especificaciones,
            categoria: el.categoria,
            stock: el.stock,
        }
    })
    Products.bulkCreate(filtrado)
}




conn.sync({ force: true }).then(() => {
    chargeDb()
    server.listen(3001, () => {
        console.log('%s listening at 3001');
    });
});