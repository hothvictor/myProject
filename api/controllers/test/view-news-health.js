module.exports = {


  friendlyName: 'View news health',


  description: 'Display "News health" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/test/news-health'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
