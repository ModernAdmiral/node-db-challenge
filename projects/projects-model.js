const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);

const find = () => {
  return db("project"); // return master list of projects
};

const add = project => {
  return db("project").insert(project);
};

const addTask = task => {
  return db("task")
    .insert(task)
    .then(id => {
      return getTaskById(id[0]);
    });
};

function getTaskById(id) {
  return db("task")
    .where("id", id)
    .first();
}

const findById = id => {
  return db("project")
    .where({ id })
    .first(); //Target specific user in db, or an empty array if it doesnt exist
};

const findTasks = task => {
  return db("task").where({ project_id: task });
};
module.exports = {
  find,
  add,
  findById,
  addTask,
  findTasks,
  getTaskById
};
