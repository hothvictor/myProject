module.exports = {


  friendlyName: 'View create news',


  description: 'Display "Create news" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/news/create-news'
    }

  },


  fn: async function (inputs, exits) {
    // if (!this.req.me) {
    //   throw {redirect: '/news'};
    // } 
    // Respond with view.
    return exits.success();

  }


};
