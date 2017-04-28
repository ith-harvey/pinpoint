
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
        },
        {
          id: 5,
          name: 'Pain',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 6,
          name: 'Keystrokes',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 7,
          name: 'Paragliding',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 8,
          name: 'Programming',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 9,
          name: 'Sailing',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 10,
          name: 'Finance',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 11,
          name: 'Elon Musk',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 12,
          name: 'Self Improvement',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 13,
          name: 'Energy',
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tags_id_seq', (SELECT MAX(id) FROM tags));"
      )
    })
}
