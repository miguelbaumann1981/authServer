const { response } = require('express');


const crearUsuario = (req, res = response) => {
   const { name, email, password } = req.body;
   console.log(name, email, password);


   return res.json({
      ok: true,
      msg: 'Crear usuario en /new'
   });
}

const loginUsuario = (req, res) => {
   const { email, password } = req.body;
   console.log(email, password);

   return res.json({
      ok: true,
      msg: 'Login de usuario /'
   });
}

const revalidarToken = (req, res) => {
   return res.json({
      ok: true,
      msg: 'Renew'
   });
}


module.exports = {
   crearUsuario,
   loginUsuario,
   revalidarToken
}