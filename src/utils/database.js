//! Instalaciones "npm i sequelize" "npm i pg  y pg-hstore (Para postgres)" 
//* Utilidad para manejar la conexion a la Base de Datos

const {Sequelize} = require('sequelize')

const config = require('../../config')

/* Esta línea de código crea una nueva instancia de la clase Sequelize y la pasa a la base de datos.
objeto de configuración para el entorno actual especificado en la propiedad `nodeEnv` de `api`
objeto en el archivo `config`. Esta instancia de Sequelize se utilizará para establecer una conexión con
la base de datos y realizar operaciones de base de datos. */
const db = new Sequelize(config.db[config.api.nodeEnv])

module.exports = db