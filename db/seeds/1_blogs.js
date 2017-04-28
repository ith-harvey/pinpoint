
exports.seed = function(knex, Promise) {
  return knex('blogs').del()
    .then(function () {
      return knex('blogs').insert([
        {
          id: 1,
          title: 'Wait but why?',
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
          title: 'Space News',
          rating: 8,
          description: 'Dedicated to covering the business and politics of the global space industry, SpaceNews is a privately owned multimedia company headquartered in Alexandria, Virginia, with staff and correspondents around the world. SpaceNews was founded in 1989 as a weekly business-to-business newspaper, which remains a must-read for thousands of government and industry space professionals.',
          url: 'http://spacenews.com/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          title: 'Thug Kitchen',
          rating: 9,
          description: 'No needless nonsense or preachy bullshit. Just delicious, healthy, homemade food for all the full-time hustlers out there. You’re too important to be eating trash food on the daily, you’re better than that. So we’ve made it easier to take care of #1: YOU.',
          url: 'http://www.thugkitchen.com/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          title: 'Seeking Alpha',
          rating: 6,
          description: 'Seeking Alpha is a crowd-sourced content service for financial markets. Articles and research covers a broad range of stocks, asset classes, ETFs and investment strategies. In contrast to other equity research platforms, insight is provided by contributor base of investors and industry experts (buy side) rather than sell side. - Wikipedia',
          url: 'https://seekingalpha.com/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 5,
          title: 'TechCrunch',
          rating: 1,
          description: 'TechCrunch is an online publisher of technology industry news. It primarily covers businesses ranging from startups to established firms. Notable journalists and contributors include venture capitalists Chris Dixon and entrepreneurs Justin Kan and Kevin Rose. The website is owned by AOL.',
          url: 'https://techcrunch.com/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 6,
          title: 'Electrek',
          rating: 6,
          description: 'Electrek is a news site tracking the transition from fossil fuel transportation to electric and the surrounding clean ecosystems. The site is part of the 9to5 network, which includes 9to5mac.com, 9to5Google.com and 9to5Toys.com.',
          url: 'https://electrek.co/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 7,
          title: 'Teslarati',
          rating: 42,
          description: 'The leading source for Tesla news, rumors and reviews. Also covering the latest developments in the world of SpaceX, Elon Musk, and the premium EV market.',
          url: 'https://www.teslarati.com/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 8,
          title: 'Mark Manson\'s blog',
          rating: 1,
          description: 'This is a blog. It is written by a dude. His name is Mark Manson.',
          url: 'https://markmanson.net/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 9,
          title: 'Free Code Camp',
          rating: 15,
          description: 'Our community publishes stories worth reading on development, design, and data science.',
          url: 'https://medium.freecodecamp.com/',
          flagged: false,
          flagged_text: '',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 10,
          title: '2ality',
          rating: 45,
          description: '2ality is a blog about JavaScript, web development and mobile computing (but other topics are covered, too, occasionally). This blog was started in March 2005. The 2ality blog is written by Dr. Axel Rauschmayer',
          url: 'http://2ality.com/',
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
