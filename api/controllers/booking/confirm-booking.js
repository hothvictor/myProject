module.exports = {


  friendlyName: 'Confirm booking',


  description: '',


  inputs: {
    id: {
      type: 'string',
      required: true

    },

    // customerAddress: {
    //   type: 'string',
    //   required: true
    // },
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

    // var user = await User.find({
    //   id: booking.customer
    // })

    await Booking.update({
      id: inputs.id
    }).set({
      status: 'Accepted'
    }).fetch();

    // Send "Confirm booking notification" email to user
    await sails.helpers.sendTemplateEmail.with({
      to: booking.customer.emailAddress,
      subject: 'Booking confirmed',
      template: 'email-booking-confirm',
      templateData: {
        user: booking.customer.fullName,
        shopName: booking.shop.shopName,
        time: booking.time,
        date: booking.date,
        remarks: booking.remarks,
        code: booking.code,
        status: 'Confirmed'
      }
    });

    return exits.success({
      id: inputs.id
    });

  }


};
