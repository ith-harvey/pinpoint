
exports.up = function(knex) {
  return knex.schema.createTable('blogs_tags',table => {
    table.increments()
    table.integer('blog_id').notNullable().references('id').inTable('blogs').onDelete('CASCADE').index()
    table.integer('tag_id').notNullable().references('id').inTable('tags').onDelete('CASCADE').index()
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('blogs_tags')
};
