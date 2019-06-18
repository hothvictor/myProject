module.exports = {


  friendlyName: 'View waiting time',


  description: 'Display "Waiting time" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/booking/waiting-time'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    var shops = await Shop.find({
      owner: this.req.me.id,
      status: 'Approved'
    });
    return exits.success({
      shops
    });

  }


};
