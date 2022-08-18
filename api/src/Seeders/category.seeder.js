const {Category} = require('../db')
const {CATEGORIAS} = require('./categorias')

async function seederCategory() { await Category.bulkCreate(CATEGORIAS);
console.log("SeederCategory")}

module.exports = { seederCategory, };
