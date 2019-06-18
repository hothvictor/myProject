module.exports = {


  friendlyName: 'View editor',


  description: 'Display "Editor" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/test/editor'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
