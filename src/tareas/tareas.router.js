const router = require("express").Router();

const services = require('./tareas.services')
const meddleware = require('../middlewares/auth.middleware')

/* Este código define las rutas para el extremo raíz de la aplicación. Está usando el Express
Enrutador para crear un nuevo objeto de enrutador y luego definir dos métodos HTTP para este punto final: GET y
POST */
router.route('/')
    .get(meddleware, services.getAllTasks)
    .post(meddleware, services.postNewTask)

/* Este código define las rutas para una tarea específica identificada por su ID. Utiliza el Express Router para
crea un nuevo objeto de enrutador y luego define tres métodos HTTP para este punto final: GET, PUT y
BORRAR. El parámetro `:id` en la ruta de la ruta es un marcador de posición para el ID real de la tarea. */
router.route('/:id')
    .get(meddleware ,services.getTaskyId)
    .put(meddleware ,services.patchTask)
    .delete(meddleware ,services.deleteTask);

module.exports = router;
