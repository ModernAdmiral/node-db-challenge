exports.up = function(knex) {
  return knex.schema
    .createTable("project", tbl => {
      tbl.increments();
      tbl
        .text("project_name", 128)
        .unique()
        .notNullable();
      tbl.text("description", 255);
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("task", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project");
      tbl.text("description", 255).notNullable();
      tbl.text("notes", 255);
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("project_resources", tbl => {
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resource");
      tbl.primary(["project_id", "resource_id"]);
    })
    .createTable("resource", tbl => {
      tbl.increments();
      tbl.text("name", 128).notNullable();
      tbl.text("description", 255);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project")
    .dropTableIfExists("task")
    .dropTableIfExists("resource")
    .dropTableIfExists("project_resources");
};
