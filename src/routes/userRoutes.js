const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const userController = require("../controllers/userController");
const userGuest = require('../middlewares/userGuest')
const userLogged= require('../middlewares/userLogged')

const validations = [
    body('email').notEmpty().withMessage('Escribe tu email').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('password').notEmpty().withMessage('Escribe tu contraseña'),
    body('nombre').notEmpty().withMessage('Escribe tu nombre completo')
]


router.get('/register', userController.registro);
router.post('/register', validations, userController.create);
router.get('/login', userLogged, userController.login)
router.post('/login', userController.loginProcess)
router.get('/profile', userGuest, userController.profile)
router.get('/logged', userController.logged)
router.get('/notLogged', userController.notLogged)
module.exports=router;