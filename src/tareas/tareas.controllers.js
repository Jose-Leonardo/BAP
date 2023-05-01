const Tareas = require('../models/tareas') //Modelo

/** Esta función encuentra todas las tareas asociadas con un usuario específico y las devuelve con ciertos
 * atributos excluidos.
 * @param usuario - El parámetro "usuario" es una variable que representa el ID 
 * . Se utiliza en la cláusula "where" de la consulta Sequelize para filtrar los resultados y
 * solo devuelve tareas que pertenecen al usuario especificado.
 * @returns La función `findAllTasks` devuelve una promesa que se resuelve en una serie de tareas
 * objetos que pertenecen al usuario especificado. Los objetos de tarea devueltos tienen ciertos atributos
 * excluidos, como `comentarios`, `responsable`, `tags`, `createdAt` y `updatedAt`.*/
const findAllTasks = async (user) => {
    const data = await Tareas.findAll({
        where: {
            user_Id: user
        },
        attributes: { 
            exclude: ['comentarios', 'responsable', 'tags', 'createdAt', 'updatedAt']
        }
    })
    return data
}

/** Esta función encuentra una tarea por su ID e ID de usuario, y devuelve los datos de la tarea excluyendo el createdAt
 * y updatedAt.
 * @param id: el ID de la tarea que debe encontrarse en la base de datos.
 * @param usuario: el parámetro de usuario es una variable que representa la identificación del usuario. Se usa en donde
 * cláusula de la consulta Sequelize para filtrar los resultados y solo devolver tareas que pertenecen al
 * usuario especificado.
 * @returns La función `findTaskById` devuelve una Promesa que resuelve los datos de una tarea con
 * el 'id' y el 'usuario' especificados de la tabla 'Tareas' en la base de datos. Los datos devueltos incluyen
 * todos los atributos de la tarea excepto `createdAt` y `updatedAt` */
const findTaskById = async (id, user) => {
    const data = await Tareas.findOne({
        where: {
            user_Id: user,
            id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}


/** Esta función crea una nueva tarea en una base de datos con el objeto de tarea y el ID de usuario proporcionados.
 * @param TaskObj: un objeto que contiene propiedades para una nueva tarea, incluido el título, la descripción,
 * estado, fecha, comentarios, responsable, etiquetas e ID de usuario.
 * @param usuario: el parámetro de usuario es el ID del usuario que está creando la nueva tarea. Es usado para
 * asociar la tarea con el usuario en la base de datos.
 * @returns La función `createNewTask` devuelve el objeto de datos creado por el
 * Método `Tareas.create`.*/
const createNewTask = async (TaskObj, user) => {
    const data = await Tareas.create({
        titulo : TaskObj.titulo,
        descripcion: TaskObj.descripcion,
        status: TaskObj.status,
        fecha:TaskObj.fecha,
        comentarios:TaskObj.comentarios,
        responsable:TaskObj.responsable,
        tags:TaskObj.tags,
        user_Id: user
    })

    return data
}

/**Esta función actualiza una tarea en una base de datos según los parámetros proporcionados.
 * @param id: el ID de la tarea que se actualizará.
 * @param titulo - Una cadena que representa el título de una tarea.
 * @param descripcion - "descripcion" es un parámetro que representa la descripción de una tarea. 
 * @param status: el parámetro de estado se utiliza para actualizar el estado de una tarea en la base de datos. Él
 * podría ser un valor de cadena como "completado", "en curso", "pendiente", etc.
 * @param fecha - fecha es un parámetro que representa la fecha asociada a una tarea. es probable
 * utilizado para rastrear cuándo se creó o actualizó una tarea.
 * @param comentarios - El parámetro "comentarios" es una cadena o texto que representa cualquier comentario o
 * notas relacionadas con la tarea que se está actualizando.
 * @param responsable - El parámetro "responsable" en la función "updateTask" se refiere a la persona
 * o entidad que es responsable de completar la tarea. Puede ser un individuo o un equipo asignado
 * para completar la tarea.
 * Etiquetas @param: el parámetro "etiquetas" es una lista de palabras clave o etiquetas que se pueden asignar a una tarea para
 * ayudar a categorizar y organizarlo. Se puede utilizar para agrupar tareas por tema, prioridad o cualquier otro
 * criterios pertinentes. En esta función, se actualiza junto con otros detalles de la tarea, como
 * @param usuario: el parámetro de usuario es el ID del usuario que está actualizando la tarea.
 * @devuelve el primer elemento de la matriz `data`, que es el número de filas afectadas por la actualización
 * operación.*/
const updateTask = async (id, titulo, descripcion, status, fecha, comentarios, responsable, tags, user) => {
    //data === 1
    const data = await Tareas.update({
        titulo : titulo,
        descripcion: descripcion,
        status: status,
        fecha:fecha,
        comentarios:comentarios,
        responsable:responsable,
        tags:tags
    },{
        where: {
            user_Id: user,
            id
        }
    })
    return data[0]
}

/** Esta función elimina una tarea de una base de datos según su ID y el usuario que la creó.
 * @param id: el parámetro id es el identificador único de la tarea que debe eliminarse de la
 * base de datos.
 * @param usuario - El parámetro `usuario` es una variable que representa la ID del usuario. Se utiliza en el
 * Cláusula `where` de la consulta Sequelize para garantizar que solo se realicen las tareas que pertenecen al usuario especificado.
 * eliminado.
 * @returns La función `deleteTask` devuelve el resultado del método `Tareas.destroy`, que es
 * una Promesa que se resuelve en el número de filas eliminadas de la base de datos*/
const deleteTask = async (id, user) => {
    const data = await Tareas.destroy({
        where: {
            user_Id: user,
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