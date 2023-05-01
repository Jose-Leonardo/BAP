const Controllers = require("./tareas.controllers");
const responses = require("../utils/handleResponses");

const getAllTasks = (req, res) => {
  Controllers.findAllTasks()
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

const getTaskyId = (req, res) => {
  const { id } = req.params;
  Controllers.findTaskById(id)
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

const postNewTask = (req, res) => {
  const tareaObj = req.body
  Controllers.createNewTask(tareaObj)
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
          status: "Boolean",
          fecha:"YYYY/MM/DD",
          comentarios:"String - (opcional)",
          responsable:"String - (opcional)",
          tags:"String - (opcional)"
        },
      });
    });
};

const patchTask = (req, res) => {
  const { id } = req.params;
  const tareaObj = req.body;

  Controllers.updateTask(id, tareaObj)
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
            name: "String"
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
          name: "String",
        },
      });
    });
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  Controllers.deleteTask(id)
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
