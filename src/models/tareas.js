//* DataTypes de sequelize, esto genera el tipo de dato 
const { DataTypes} = require('sequelize')

const db = require('../utils/database');

//Este es el modelo
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
  }
  });
  
  module.exports = Tareas