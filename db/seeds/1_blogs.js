
exports.seed = function(knex, Promise) {
  return knex('blogs').del()
    .then(function () {
      return knex('blogs').insert([
        {
          id: 1,
          title: 'Wait buy why?',
          rating: 10,
          description: 'Wait But Why (WBW) is a site founded by Tim Urban and Andrew Finn and written and illustrated by Tim Urban. The site covers a range of subjects as a long-form blog. Content has been syndicated on The Huffington Post, Lifehacker, as well as being referenced on other sites. Typical posts involve long form explanations of various topics, including artificial intelligence, outer space, and procrastination using a combination of prose and rough illustrations. - Wikipedia',
          url: 'http://waitbutwhy.com/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          title: '',
          rating: 8,
          description: 'Wait But Why (WBW) is a site founded by Tim Urban and Andrew Finn and written and illustrated by Tim Urban. The site covers a range of subjects as a long-form blog. Content has been syndicated on The Huffington Post, Lifehacker, as well as being referenced on other sites. Typical posts involve long form explanations of various topics, including artificial intelligence, outer space, and',
          url: '',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('blogs_id_seq', (SELECT MAX(id) FROM blogs));"
      )
    })
};
