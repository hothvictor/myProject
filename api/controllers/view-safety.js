module.exports = {


  friendlyName: 'View safety',


  description: 'Display "Safety" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/safety'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
