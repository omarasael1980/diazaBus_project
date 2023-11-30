import express  from "express";
import checkAuth from "../middleware/checkAuth.js";
import {    createUsers, 
            authenticate, 
            confirmUser, 
            passForgotten, 
            verifyToken, 
            newPassword,
            perfil} from "../controllers/usersController.js"
 
const router = express.Router();

//auth, create and confirm users

router.post('/', createUsers)
router.post('/login',authenticate)
//confirm an user when a token has been sended by mail
router.get('/confirmar/:token', confirmUser)
// ask for a token to recover a forgotten password
router.post('/password-olvidado', passForgotten) 
//verify if it is a valid token and to save a new password
router.route('/password-olvidado/:token').get(verifyToken).post(newPassword)

router.get('/perfil', checkAuth, perfil)

export default router  