
exports.up = function(knex) {
  return knex.schema.createTable('users',table => {
    table.increments()
    table.string('name').notNull()
    table.string('email').notNull().unique()
    table.specificType('hashed_password','char(60)').notNull()
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('users')
};
