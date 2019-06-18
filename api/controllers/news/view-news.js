module.exports = {


  friendlyName: 'View news',


  description: 'Display "News" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/news/news'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
