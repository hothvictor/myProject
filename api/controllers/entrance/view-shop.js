module.exports = {


  friendlyName: 'View shop',


  description: 'Display "Shop" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/shop'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
