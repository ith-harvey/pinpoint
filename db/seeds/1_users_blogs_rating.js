
exports.seed = function(knex, Promise) {
  return knex('users_blogs_rating').del()
    .then(function () {
      return knex('users_blogs_rating').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_blogs_rating_id_seq', (SELECT MAX(id) FROM users_blogs_rating));"
      )
    })
}
