const router = require("express").Router();

const services = require('./tareas.services')

router.get("/", services.getAllTasks);
router.post("/", services.postNewTask);

router.get("/:id", services.getTaskyId);
router.put("/:id", services.patchTask);
router.delete("/:id", services.deleteTask);

module.exports = router;
