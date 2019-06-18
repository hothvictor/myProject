module.exports = {


  friendlyName: 'View available article',


  description: 'Display "Available article" page.',



  exits: {

    success: {
      viewTemplatePath: 'pages/news/available-article'
    }

  },


  fn: async function (inputs, exits) {

    var news = await News.findOne({
      id: this.req.params.id
    })
    var view = news.views;
    await News.update({
      id: this.req.params.id
    }).set({
      views: view +1
    });

    var newss = await News.find({
      id: this.req.params.id
    });


    var suggests = await News.find().sort({
      "views": -1
    }).limit(5);

    var comments = await Comment.find({
      article: this.req.params.id,
    }).populate('owner');


    // Respond with view.
    return exits.success({
      newss,
      suggests,
      comments
    });

  }


};
