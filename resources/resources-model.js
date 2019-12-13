const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);

const find = () => {
  return db("resource"); // return master list of projects
};

const add = resource => {
  return db("resource").insert(resource);
};
module.exports = {
  find,
  add
};
