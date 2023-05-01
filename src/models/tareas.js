//* DataTypes de sequelize, esto genera el tipo de dato 
const { DataTypes} = require('sequelize')

const db = require('../utils/database');

//Este es el modelo
/* This code is defining a Sequelize model called "Tareas" with several properties such as "id",
"titulo", "descripcion", "status", "fecha", "comentarios", "responsable", and "tags". Each property
has a specific data type defined using the Sequelize DataTypes object. The "Tareas" model is then
exported to be used in other parts of the application. */
const Tareas = db.define("tareas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  fecha:{
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  comentarios:{
    type: DataTypes.STRING
  },
  responsable:{
    type: DataTypes.STRING
  },
  tags:{
    type: DataTypes.STRING
  },
  user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false
    /*references: { //*En caso de unir con una tabla exterior
        key: 'id',
        model: Adress
    }*/
  }
  });
  
  module.exports = Tareas