//*gestionando mis variables de entorno
// "npm i dotenv" habilita entrar a las variables de entorno -.env-

require('dotenv').config()

const configs = {
    api: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'http://localhost:3000',
        nodeEnv: process.env.NODE_ENV || 'development'
    },
    db: {
        development: {
            //? Aqui deberan estar las configuraciones para la conexion con sequelize
            dialect: 'postgres',
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || "5432",
            username: process.env.DB_USER || "postgres",
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            define: {//? Nos obliga a que todas las tablas tengan la propiedad createdAt y upadtedAt
                timestamps: true, 
                underscored: true,
                underscoredAll: true 
            }
        }
    }
}

module.exports = configs