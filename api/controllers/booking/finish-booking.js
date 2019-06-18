module.exports = {


  friendlyName: 'Finish booking',


  description: '',


  inputs: {
    id: {
      type: 'string'
    },
  },


  exits: {
    success: {
      outputDescription: 'information about the created record',
      outputType: {
        id: 'string',
        // imageSrc: 'string'
      }
    },

    badRequest: {
      description: 'Form error.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {


    var booking = await Booking.findOne({
      id: inputs.id
    }).populate('customer').populate('shop')


    await Booking.update({
      id: inputs.id
    }).set({
      status: 'Completed'
    }).fetch();

    // Send "Review booking notification" email to user
    await sails.helpers.sendTemplateEmail.with({
      to: booking.customer.emailAddress,
      subject: 'Booking completed, please make a review',
      template: 'email-booking-complete',
      templateData: {
        user: booking.customer.fullName,
        shopName: booking.shop.shopName,
        time: booking.time,
        date: booking.date,
        remarks: booking.remarks,
      }
    });

    return exits.success({
      id: inputs.id
    });

  }


};
