const {Router} = require('express')
const { authJwt } = require("../Auth");
const {crearUsuario} = require('../Middleware/User/createUser');
const {modificarUsuario} = require('../Middleware/User/updateUser');
const {eliminarUsuario} = require('../Middleware/User/deleteUser');
const {modificarRol} = require('../Middleware/User/setRole');
const router = Router()

router.post("/", async (req, res, next)=>
{   let {username, email, password} = req.body
    try
    {
        let usuario = await crearUsuario(username, email, password)
        usuario ?
        res.send({ message:"Usuario "+username+" creado"}): res.send({ message:"Problemas de duplicidad de username/email"})
    }
    catch (error) { next(error) ; console.log(error) }
})

router.get("/:email", async (req, res, next)=>
{   let {  email } = req.params
    try
    {
        let usuario = await crearUsuario(username, email, password)
        usuario ?
        res.send({ message:"Usuario "+username+" creado"}): res.send({ message:"Problemas de duplicidad de username/email"})
    }
    catch (error) { next(error) ; console.log(error) }
})
  
  router.put("/:id" , async (req, res, next)=>
  {   let {username, email, password} = req.body
      let {id} = req.params
      try
      {
          let usuario = await modificarUsuario(id, username, email, password)
          usuario ?
          res.send({ message:"Usuario "+username+" midficado"}): res.send({ message:"Problemas de duplicidad de username/email"})
      }
      catch (error) { next(error) ; console.log(error) }}
  );

  router.put("/rol/:id", async (req, res, next)=>
  {   let {admin} = req.body
      let {id} = req.params
      try
      {
          let usuario = await modificarRol(id, admin)
          usuario ?
          res.send({ message:"Usuario "+username+" con rol modificado"}): res.send({ message:"Problemas en la busqueda de usuario"})
      }
      catch (error) { next(error) ; console.log(error) }
  }
  );
  
  router.delete("/:id", async (req, res, next)=>
  {   let {id} = req.params
      try
      {
          let usuario = await eliminarUsuario(id)
          usuario ?
          res.send({ message:"Usuario eliminado"}): res.send({ message:"Usuario no encontrado"})
      }
      catch (error) { next(error) ; console.log(error) }}
  );

module.exports = router