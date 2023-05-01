const Controllers = require("./tareas.controllers");
const responses = require("../utils/handleResponses");

/**Esta función recupera todas las tareas para un usuario determinado y devuelve una respuesta de éxito con los datos o
 * una respuesta de error con un mensaje.
 * @param req - req significa solicitud y es un objeto que contiene información sobre el HTTP
 * solicitud que se realizó, como los encabezados de solicitud, los parámetros de consulta y el cuerpo de la solicitud. esta pasado
 * como parámetro de la función getAllTasks.
 * @param res - res es el objeto de respuesta que se usa para enviar la respuesta al cliente. Es
 * una instancia del objeto de respuesta Express y contiene métodos para establecer el código de estado HTTP,
 * encabezados y enviar el cuerpo de la respuesta.*/
const getAllTasks = (req, res) => {
  const {user = 1} = req.query;
  Controllers.findAllTasks(user)
    .then((data) => {
      responses.success({
        status: 200,
        data: data,
        message: "Getting all body",
        res,
      });
    })
    .catch((err) => {
      responses.error({
        status: 401,
        data: err,
        message: "Something wrong with getting all the body parts",
        res,
      });
    });
};

/**Esta función recupera una tarea por su ID e ID de usuario y devuelve una respuesta de éxito con la tarea
 * datos o una respuesta de error si no se encuentra la tarea o hay un error.*/
const getTaskyId = (req, res) => {
  const { id } = req.params;
  const {user = 1} = req.query;
  Controllers.findTaskById(id, user)
    .then((data) => {
      if (data) {
        responses.success({
          status: 200,
          data,
          message: `Getting task with id: ${id}`,
          res,
        });
      } else {
        responses.error({
          status: 404,
          message: `task with ID: ${id}, not found`,
          res,
        });
      }
    })
    .catch((err) => {
      responses.error({
        status: 400,
        data: err,
        message: "Something bad getting the task",
        res,
      });
    });
};

/**Esta función crea una nueva tarea y devuelve una respuesta de éxito con el ID de la tarea o un error
 * respuesta con requisitos de campo específicos.*/
const postNewTask = (req, res) => {
  const tareaObj = req.body
  const {user = 1} = req.query;
  
  Controllers.createNewTask(tareaObj, user)
    .then((data) => {
      responses.success({
        status: 201,
        data,
        message: `body created succesfully with id: ${data.id}`,
        res,
      });
    })
    .catch((err) => {
      responses.error({
        status: 400,
        data: err,
        message: "Error ocurred trying to create a new body",
        res,
        fields: {
          titulo: "String",
          descripcion:"String",
          status: "String",
          fecha:"YYYY/MM/DD",
          comentarios:"String - (opcional)",
          responsable:"String - (opcional)",
          tags:"String - (opcional)"
        },
      });
    });
};

// Esta función actualiza una tarea con el ID dado y devuelve una respuesta de éxito o error
const patchTask = (req, res) => {
  const { id } = req.params;
  const {titulo, descripcion, status, fecha, comentarios, responsable, tags} = req.body;
  const {user = 1} = req.query;

  Controllers.updateTask(id,titulo, descripcion, status, fecha, comentarios, responsable, tags, user)
    .then((data) => {
      if (data) {
        responses.success({
          status: 200,
          data,
          message: `body with id: ${id} modified successfully`,
          res,
        });
      } else {
        responses.error({
          status: 404,
          message: `The body with ID ${id} not found`,
          res,
          fields: {
            titulo: "String",
            descripcion:"String",
            status: "String",
            fecha:"YYYY/MM/DD",
            comentarios:"String - (opcional)",
            responsable:"String - (opcional)",
            tags:"String - (opcional)"
          },
        });
      }
    })
    .catch((err) => {
      responses.error({
        status: 400,
        data: err,
        message: `Error ocurred trying to update task with id ${id}`,
        res,
        fields: {
          titulo: "String",
          descripcion:"String",
          status: "String",
          fecha:"YYYY/MM/DD",
          comentarios:"String - (opcional)",
          responsable:"String - (opcional)",
          tags:"String - (opcional)"
        },
      });
    });
};

/**Esta función elimina una tarea con una ID específica y devuelve un mensaje de éxito si la tarea es
 * eliminado, o un mensaje de error si no se encuentra la tarea o se produce un error durante la eliminación.*/
const deleteTask = (req, res) => {
  const { id } = req.params;
  const {user = 1} = req.query;

  Controllers.deleteTask(id, user)
    .then((data) => {
      if (data) {
        responses.success({
          status: 200,
          data,
          message: `task with id: ${id} deleted successfully`,
          res,
        });
      } else {
        responses.error({
          status: 404,
          data: err,
          message: `The task with ID ${id} not found`,
          res,
        });
      }
    })
    .catch((err) => {
      responses.error({
        status: 400,
        data: err,
        message: `Error ocurred trying to delete task with id ${id}`,
        res,
      });
    });
};

module.exports = {
  getAllTasks,
  postNewTask,
  patchTask,
  deleteTask,
  getTaskyId
};
