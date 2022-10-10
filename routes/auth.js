
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validartJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear un nuevo usuario
router.post('/new', [
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatoria').isLength({min: 5}),
   validarCampos
], crearUsuario);


// Login usuario
router.post('/', [
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatoria').isLength({min: 5}),
   validarCampos
], loginUsuario);


// Validar y revalidar token
router.get('/renew', validartJWT, revalidarToken);


module.exports = router;