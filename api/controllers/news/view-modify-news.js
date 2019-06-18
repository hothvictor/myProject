module.exports = {


  friendlyName: 'View modify news',


  description: 'Display "Modify news" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/news/modify-news'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
