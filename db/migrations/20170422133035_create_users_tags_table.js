
exports.up = function(knex) {
  return knex.schema.createTable('users_tags',table => {
    table.increments()
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index()
    table.integer('tag_id').notNullable().references('id').inTable('tags').onDelete('CASCADE').index()
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('users_tags')
};
