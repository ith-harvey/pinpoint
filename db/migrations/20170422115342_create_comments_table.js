
exports.up = function(knex) {
  return knex.schema.createTable('comments',table => {
    table.increments()
    table.integer('blog_id').notNullable().references('id').inTable('blogs').onDelete('CASCADE').index()
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index()
    table.integer('rating').notNull().defaultTo(0)
    table.text('text').notNull()
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('comments')
};
