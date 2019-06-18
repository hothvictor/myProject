module.exports = {


  friendlyName: 'View news article',


  description: 'Display "News article" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/article/news-article'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
