const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


 const crearUsuario = async(req, res = response) => {
   const { name, email, password } = req.body;
   console.log(name, email, password);

   try {
      // Verificar el email
      const usuario = await Usuario.findOne({email});
      if (usuario) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe'
         });
      }

      // Crear usuario con el modelo
      const dbUsuario = new Usuario(req.body);

      // Hash la contraseña
      const salt = bcrypt.genSaltSync();
      dbUsuario.password = bcrypt.hashSync(password, salt);

      // Generar el jsonWebToken
      const token = await generarJWT(dbUsuario.id, name);

      // Crear usuario de BBDD
      await dbUsuario.save();

      // Generar respuesta éxito
      return res.status(201).json({
         ok: true,
         uid: dbUsuario.id,
         name,
         token
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });
   }

}

// ---------- Login

const loginUsuario = async(req, res) => {
   const { email, password } = req.body;
   console.log(email, password);

   try {
      const dbUsuario = await Usuario.findOne({email});
      if (!dbUsuario) {
         return res.status(400).json({
            ok: false,
            msg: 'El correo no existe'
         });
      }

      // Confirmar si el password hace match
      const validPassword = bcrypt.compareSync(password, dbUsuario.password);
      if (!validPassword) {
         return res.status(400).json({
            ok: false,
            msg: 'El password no es válido'
         });
      }

      // Generar el JWT
      const token = await generarJWT(dbUsuario.id, dbUsuario.name);

      // Respuesta servicio
      return res.json({
         ok: true,
         uid: dbUsuario.id,
         name: dbUsuario.name,
         token
      })
      
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });
   }

}

// ---------- Renovar token

const revalidarToken = async(req, res) => {
   const { uid, name } = req;

   // Generar el JWT
   const token = await generarJWT(dbUsuario.id, name);
   

   return res.json({
      ok: true,
      uid,
      name,
      token
   });
}


module.exports = {
   crearUsuario,
   loginUsuario,
   revalidarToken
}