module.exports = {


  friendlyName: 'View shop signup',


  description: 'Display "Shop signup" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/shop-signup'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
