//Modulos
const express = require('express')
const swaggerUI = require('swagger-ui-express')

//Importaciones
const db = require('./utils/database')
const response = require('./utils/handleResponses')
const initModels = require('./models/initModels')
const {port, host} = require('../config').api
const tareasRoutes = require('./tareas/tareas.router')
const swaggerObj = require('./docs/swaggerObj.json')

const app = express()
app.use(express.json())

db.authenticate()//Autentetica la base de datos
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err))
db.sync()//Sincroniza la base de datos 
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))
    
/* `initModels()` es una función que inicializa los modelos de la base de datos importándolos desde su
respectivos archivos y llamando a su método `init()`. Esto asegura que los modelos estén configurados correctamente.
y listo para ser utilizado por la aplicación. */
initModels()

//Rutas
app.use('/api/v1/tareas', tareasRoutes)
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerObj))

app.get('/', (req, res) => {
    response.success({
        res,
        status: 200,
        message: 'Servidor inicializado correctamente',
        data: {
            "Tareas": `${host}/api/v1/tareas`,
            "Documentacion": `${host}/api/v1/docs`
        }
    })
})

app.use('*', (req, res) => {
    response.error({
        res,
        status:404,
        message: `URL not found, please try with ${port}`
    })
})

app.listen(port, ()=>{
    console.log(`Server started at port ${port} `)
})