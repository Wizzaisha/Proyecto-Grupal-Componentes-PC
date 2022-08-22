const {Product} = require("../db")

//descontar es boolean, si es true se descuenta, de lo contrario se agrega
//cantidad es la cantidad de stock a descontar o agregar
const modificarStockProducto = async ( id, descontar, cantidad)=>
{
let producto = await Product.findByPk(id)
let count = producto.stock
descontar ? count-= cantidad : count+= cantidad;
producto.stock =  count;
producto.save();
return true;
}
module.exports ={modificarStockProducto}