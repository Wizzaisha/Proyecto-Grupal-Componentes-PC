const {Category} = require('../db')
const {CATEGORIAS} = require('./categorias')

function seederCategory() { Category.bulkCreate(CATEGORIAS); }
  
  module.exports = {
    seederCategory,
  };
  
