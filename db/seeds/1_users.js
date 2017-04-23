
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          user_name: 'Mike',
          email: 'email@gmail.com',
          hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          user_name: 'Elon',
          email: 'otherEmail@gmail.com',
          hashed_password: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          user_name: 'Layla',
          email: 'laylasEmail@gmail.com',
          hashed_password: '',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    })
}
