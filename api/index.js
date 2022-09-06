
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {seederCategory} = require("./src/Seeders/category.seeder")
const { seederRole} = require("./src/Seeders/role.seeder")
const {productoSeeder} = require("./src/Seeders/product.seeder")

conn.sync().then(() => {

    server.listen(3001, () => {
        console.log('%s listening at 3001');

    });
});


/*
         seederCategory();
         seederRole();
         productoSeeder();
{ force: true }
*/