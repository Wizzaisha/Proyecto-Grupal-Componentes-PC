const express = require("express");
const {Router} = require('express')
const { authJwt } = require("../Auth");
const {crearUsuario} = require('../Middleware/User/createUser');
const {modificarUsuario} = require('../Middleware/User/updateUser');
const {eliminarUsuario} = require('../Middleware/User/deleteUser');
const {modificarRol} = require('../Middleware/User/setRole');
const {obtenerUsuarios,obtenerUsuariosById} = require('../Middleware/User/getUser');
const router = Router()

router.use(express.json());

router.get("/", /* [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], */   async (req, res, next)=>
{ 
   let {  email } = req.query
    console.log("entro")
    try
    {
        let usuarios = await obtenerUsuarios(email)
        usuarios ?
        res.send(usuarios): res.send({ message:"Problemas al traer Usuario/s"})
    }
    catch (error) { next(error) ; /*console.log(error) */}
})

router.get("/:id", /* [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], */ async (req, res, next)=>
{   let {  id } = req.params
    try
    {
        let usuario = await obtenerUsuariosById(id)
       if(usuario)  { return res.send(usuario)}
       else {res.send({ message:"Problemas al traer Usuario"})}
       
    }
    catch (error) { next(error) ; console.log(error) }
})

router.post("/", /* [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], */ async (req, res, next)=>
{   let {username, email, password} = req.body
    try
    {
        let usuario = await crearUsuario(username, email, password)
        usuario ?
        res.send({ message:"Usuario "+username+" creado"}): res.send({ message:"Problemas de duplicidad de username/email"})
    }
    catch (error) { next(error) ; console.log(error) }
})

router.put("/:id" , /* [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], */ async (req, res, next)=>
  {   let {username, email, password} = req.body
      let {id} = req.params
      try
      {
          let usuario = await modificarUsuario(id, username, email, password)
          usuario.flag ?
          res.send({ message:"Usuario "+username+" midficado"}): res.send(usuario.message)
      }
      catch (error) { next(error) ; console.log(error) }}
);

router.put("/rol/:id", /* [authJwt.verifyToken, authJwt.isSuperAdmin], */ async (req, res, next)=>
  {   let {admin} = req.body
      let {id} = req.params
      try
      {
          let usuario = await modificarRol(id, admin)
          usuario ?
          res.send({ message:"Usuario con rol modificado"}): res.send({ message:"Problemas en la busqueda de usuario"})
      }
      catch (error) { next(error) ; console.log(error) }
  }
);

router.delete("/:id", /* [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], */ async (req, res, next)=>
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