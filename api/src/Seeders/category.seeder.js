const {Category} = require('../db')
const {CATEGORIAS} = require('./categorias')

function seederCategory() { Category.bulkCreate(CATEGORIAS); console.log("SeederCategory")}
  
  module.exports = {
    seederCategory,
  };
  
