
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
        {
          id: 3,
          blog_id: 2,
          tag_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          blog_id: 5,
          tag_id: 5,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 5,
          blog_id: 5,
          tag_id: 7,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 6,
          blog_id: 3,
          tag_id: 6,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 7,
          blog_id: 4,
          tag_id: 7,
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
