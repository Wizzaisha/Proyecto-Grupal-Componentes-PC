const {Router} = require('express')
const {  checkDuplicateUsernameOrEmail, verifySignUp , controller } = require("../Auth");
const router = Router()

// router.post("/signup",
//    [checkDuplicateUsernameOrEmail, verifySignUp],
//     controller.signup
//   );
  
  router.post("/signin", controller.signin);
  
  router.post("/refreshtoken", controller.refreshToken);



module.exports = router