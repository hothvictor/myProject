module.exports = {


  friendlyName: 'View test',


  description: 'Display "Test" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/test'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.

    var news = [
      { id : 1, label: 'news1'},
      { id : 2, label: 'news2'},
    ]

    return exits.success({newss:newss});

  }


};
