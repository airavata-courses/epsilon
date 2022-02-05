exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("email", 255).unique().notNullable();
    table.string("first_name", 255);
    table.string("last_name", 255);
    table.string("google_id", 255).unique().notNullable();
    table.string("image_url");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
