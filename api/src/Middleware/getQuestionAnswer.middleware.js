const { Question, Product } = require("../db")

const mostrarCuestionario = async (productId) => {

    let cuestionario = await Question.findAll({ include: [{ model: Product, where: { id: productId } }] })
    console.log(cuestionario);
    let toObject = []
    cuestionario?.map(e => {
        toObject.push({
            id: e.id,
            sendUser: e.sendUser,
            emailUser: e.emailUser,
            sendAdmin: e.sendAdmin,
            emailAdmin: e.emailAdmin,
            fecha: e.fecha
        })
    })
    return toObject
}
module.exports = { mostrarCuestionario }