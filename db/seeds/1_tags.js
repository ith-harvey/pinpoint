
exports.seed = function(knex) {
  return knex('tags').del()
    .then(function () {
      return knex('tags').insert([
        {
          id: 1,
          name: 'Space',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'Consumer Technology',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          name: 'Marketing',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          name: 'Cooking',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tags_id_seq', (SELECT MAX(id) FROM tags));"
      )
    })
}
