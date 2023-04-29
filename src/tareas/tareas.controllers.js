const Tareas = require('../models/tareas')

const findAllTasks = async () => {
    const data = await Tareas.findAll({
        attributes: { //evita ciertos datos
            exclude: ['comentarios', 'responsable', 'tags', 'createdAt', 'updatedAt']
        }
    })
    return data
}

const findTaskById = async (id) => {
    const data = await Tareas.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}


const createNewTask = async (TaskObj) => {
    const data = await Tareas.create({
        titulo : TaskObj.titulo,
        descripcion: TaskObj.descripcion,
        status: TaskObj.status,
        fecha:TaskObj.fecha,
        comentarios:TaskObj.comentarios,
        responsable:TaskObj.responsable,
        tags:TaskObj.tags
    })

    return data
}

const updateTask = async (id, TaskObj) => {
    //data === 1
    const data = await Tareas.update({
        titulo : TaskObj.titulo,
        descripcion: TaskObj.descripcion,
        status: TaskObj.status,
        fecha:TaskObj.fecha,
        comentarios:TaskObj.comentarios,
        responsable:TaskObj.responsable,
        tags:TaskObj.tags
    },{
        where: {
            id
        }
    })
    return data[0]
}

const deleteTask = async (id) => {
    const data = await Tareas.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    findAllTasks,
    findTaskById,
    createNewTask,
    updateTask,
    deleteTask
}