
exports.up = function(knex) {
  return knex.schema.createTable('users_comments_rating',table => {
    table.increments()
    table.integer('comment_id').notNullable().references('id').inTable('comments').onDelete('CASCADE').index()
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index()
    table.boolean('vote_direction').notNull()
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('users_comments_rating')
};
