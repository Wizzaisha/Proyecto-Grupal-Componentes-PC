
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {seederCategory} = require("./src/Seeders/category.seeder")
const { seederRole} = require("./src/Seeders/role.seeder")

conn.sync({force: true}).then(() => {
    server.listen(3001, async() => {
        console.log('%s listening at 3001');
        await seederCategory();
        await seederRole();
    });
});