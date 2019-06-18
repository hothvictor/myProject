module.exports = {


  friendlyName: 'View available booking',


  description: 'Display "Available booking" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/booking/available-booking'
    }

  },


  fn: async function (inputs, exits) {
    // shop owner
    var datas = await Booking.find({
      owner: this.req.me.id
    }).sort({
      'id': -1
    }).populate('shop').populate('owner').populate('customer')

    // user
    var books = await Booking.find({
      customer: this.req.me.id
    }).populate('shop')


    // Respond with view.
    return exits.success({
      datas,
      books
    });

  }


};
