module.exports = {


  friendlyName: 'View bike news',


  description: 'Display "Bike news" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/bikenews/bike-news'
    }

  },


  fn: async function (req, exits) {

    var url = 'https://newsapi.org/v2/everything?q=cycling&apiKey=083be1c3a4914b3fbc8134118e730ddf';

    var req = sails.request(url);

    // fetch(req)
    //     .then(function(response) {
    //         console.log(response.json());
    //     })
    var bikenews = await Bikenews.create({
      req
    }).fetch();

    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('083be1c3a4914b3fbc8134118e730ddf');
    // To query /v2/top-headlines
    // All options passed to topHeadlines are optional, but you need to include at least one of them
    newsapi.v2.topHeadlines({
      sources: 'bbc-news,the-verge',
      q: 'bitcoin',
      category: 'business',
      language: 'en',
      country: 'us'
    }).then(response => {
      console.log(response);
      /*
        {
          status: "ok",
          articles: [...]
        }
      */
    });

    // Respond with view.
    return exits.success({
      bikenews
    });

  }


};
