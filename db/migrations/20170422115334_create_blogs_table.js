
exports.up = function(knex) {
  return knex.schema.createTable('blogs',table => {
    table.increments()
    table.string('title').notNull()
    table.integer('rating').notNull().defaultTo(0)
    table.text('description').notNull()
    table.string('url').notNull()
    table.boolean('flagged').notNull().defaultTo(false)
    table.text('flagged_text').notNull().defaultTo('user flagged blog without reason or has not been flagged')
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('blogs')
};
