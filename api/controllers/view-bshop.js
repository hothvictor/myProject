module.exports = {


  friendlyName: 'View bshop',


  description: 'Display "Bshop" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/bshop'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
