
exports.up = function(knex) {
  return knex.schema.createTable('users_blogs_rating',table => {
    table.increments()
    table.integer('blog_id').notNullable().references('id').inTable('blogs').onDelete('CASCADE').index()
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index()
    table.boolean('vote_direction').notNull()
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('users_blogs_rating')
};
