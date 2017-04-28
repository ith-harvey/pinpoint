
exports.seed = function(knex, Promise) {
  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        {
          id: 1,
          blog_id: 1,
          user_id: 1,
          rating: 0,
          text: 'Are you ready for this much information?',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          blog_id: 2,
          user_id: 1,
          rating: 0,
          text: 'This is a great source of information on the space industry.',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments));"
      )
    })
}
