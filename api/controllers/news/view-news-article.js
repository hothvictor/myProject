module.exports = {


  friendlyName: 'View news article',


  description: 'Display "News article" page.',

  


  exits: {

    success: {
      viewTemplatePath: 'pages/news/news-article'
    }

  },


  fn: async function (inputs, exits) {

    // var news = await News.findOne({
    //   // id: inputs.id
    //   id: this.req.params.id      
    // });

    // if (!news) {
    //   throw 'notFound';
    // }

    // Respond with view.
    return exits.success({
      // news
    });

  }


};
