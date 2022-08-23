const {Router} = require('express')
const {  veryfySignUp , controller } = require("../Auth");
const router = Router()

router.post("/signup",
   [veryfySignUp.checkDuplicateUsernameOrEmail, veryfySignUp.checkRolesExisted],
    controller.signup
  );
  
  router.post("/signin", controller.signin);
  
  router.post("/refreshtoken", controller.refreshToken);

module.exports = router