
exports.seed = function(knex, Promise) {
  return knex('users_comments_rating').del()
    .then(function () {
      return knex('users_comments_rating').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments));"
      )
    })
}
