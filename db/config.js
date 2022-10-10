const mongoose = require("mongoose");

const dbConnection = async() => {
   try {
      await mongoose.connect(process.env.BD_CNN);
      console.log('BBDD online');
   } catch (error) {
      console.log(error);
      throw new Error('Error a la hora de inicializar la BBDD');
   }
}

module.exports = {
   dbConnection
}