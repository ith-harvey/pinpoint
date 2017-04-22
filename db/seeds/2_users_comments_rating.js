
exports.seed = function(knex, Promise) {
  return knex('users_comments_rating').del()
    .then(function () {
      return knex('users_comments_rating').insert([
        {
          id: 1,
          comment_id: 1,
          user_id: 1,
          vote_direction: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          comment_id: 2,
          user_id: 2,
          vote_direction: false,
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments));"
      )
    })
}
