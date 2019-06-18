module.exports = {


  friendlyName: 'New booking',


  description: '',


  inputs: {
    // service: {
    //   type: 'string',
    //   required: true
    // },

    remarks: {
      type: 'string'
    },

    time: {
      type: 'string',
      required: true
    },

    date: {
      type: 'string',
      required: true
    },

    shopId: {
      type: 'string',
      required: true
    },

    shopOwner: {
      type: 'string',
      required: true
    },

    shopEmail: {
      type: 'string',
      required: true
    },

    shopName: {
      type: 'string',
      required: true
    }
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

    var randomCode = Math.floor((Math.random() * 100000) + 1);
    var total = await Booking.count({
      code: randomCode
    })
    if (total > 0) {
      var randomCode = Math.floor((Math.random() * 100000) + 1);
    } else {
      var code = randomCode;
    }



    var newBooking = await Booking.create({
      owner: inputs.shopOwner,
      shop: inputs.shopId,
      customer: this.req.me.id,
      date: inputs.date,
      time: inputs.time,
      // service: inputs.service,
      remarks: inputs.remarks,
      status: 'Requested',
      review: 'false',
      code: code,
    }).fetch();

    // Send "Booking notification" email to shop owner
    if (!inputs.remarks) {
      await sails.helpers.sendTemplateEmail.with({
        to: inputs.shopEmail,
        subject: 'New Booking Received',
        template: 'email-booking-notification',
        templateData: {
          shopName: inputs.shopName,
          time: inputs.time,
          date: inputs.date,
          remarks: 'null'
        }
      });
    } else {
      await sails.helpers.sendTemplateEmail.with({
        to: inputs.shopEmail,
        subject: 'New Booking Received',
        template: 'email-booking-notification',
        templateData: {
          shopName: inputs.shopName,
          time: inputs.time,
          date: inputs.date,
          remarks: inputs.remarks
        }
      });
    }

    return exits.success({
      id: newBooking.id,
    });

  }
};
