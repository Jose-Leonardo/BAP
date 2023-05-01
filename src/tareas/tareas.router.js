const router = require("express").Router();

const services = require('./tareas.services')
const meddleware = require('../middlewares/auth.middleware')

router.route('/')
    .get(meddleware ,services.getAllTasks)
    .post(meddleware, services.postNewTask)

router.route('/:id')
    .get(meddleware ,services.getTaskyId)
    .put(meddleware ,services.patchTask)
    .delete(meddleware ,services.deleteTask);

module.exports = router;
