
exports.seed = function(knex, Promise) {
  return knex('users_tags').del()
    .then(function () {
      return knex('users_tags').insert([
        {
          id: 1,
          user_id: 1,
          tag_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          user_id: 1,
          tag_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          user_id: 1,
          tag_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          user_id: 1,
          tag_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_tags_id_seq', (SELECT MAX(id) FROM users_tags));"
      )
    })
}
