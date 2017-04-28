
exports.seed = function(knex) {
  return knex('users_blogs_rating').del()
    .then(function () {
      return knex('users_blogs_rating').insert([
        {
          id: 1,
          blog_id: 1,
          user_id: 1,
          vote_direction: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          blog_id: 1,
          user_id: 1,
          vote_direction: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          blog_id: 2,
          user_id: 1,
          vote_direction: false,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_blogs_rating_id_seq', (SELECT MAX(id) FROM users_blogs_rating));"
      )
    })
}
