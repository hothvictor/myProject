module.exports = {


  friendlyName: 'View hello',


  description: 'Display "Hello" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/hello'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
