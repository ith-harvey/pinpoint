
exports.seed = function(knex, Promise) {
  return knex('blogs').del()
    .then(function () {
      return knex('blogs').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('blogs_id_seq', (SELECT MAX(id) FROM blogs));"
      )
    })
};
