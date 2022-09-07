const {Category} = require('../db')
const {CATEGORIAS} = require('./categorias')

async function seederCategory() { 
  
  const response = await Category.findAll();

  if (response.length > 0){
    console.log("Categorias ya cargadas");
  } else {
    Category.bulkCreate(CATEGORIAS); 
    console.log("SeederCategory")
  }

}
  
  module.exports = {
    seederCategory,
  };
  
