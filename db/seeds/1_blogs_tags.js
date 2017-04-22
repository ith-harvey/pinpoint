
exports.seed = function(knex, Promise) {
  return knex('blogs_tags').del()
    .then(function () {
      return knex('blogs_tags').insert([
        {
                  id: 1,
                  blog_id: 1,
                  tag_id: 1,
                  created_at: new Date(),
                  updated_at: new Date()
        },
        {
                  id: 2,
                  blog_id: 2,
                  tag_id: 2,
                  created_at: new Date(),
                  updated_at: new Date()
        },
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('blogs_tags_id_seq', (SELECT MAX(id) FROM blogs_tags));"
      )
    })
}
