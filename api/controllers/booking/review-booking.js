module.exports = {


  friendlyName: 'Review booking',


  description: '',


  inputs: {

    bookingId: {
      type: 'number',
      required: true
    },

    shopRatings: {
      type: 'number',
      required: true
    },

    shopId: {
      type: 'number',
      required: true
    },

    selected: {
      type: 'number',
      required: true

    },

    feedback: {
      type: 'string'
    },

  },


  exits: {
    success: {
      outputDescription: 'information about the created record',
      outputType: {
        bookingId: 'number',
      }
    },

    badRequest: {
      description: 'No record uploaded.',
      responseType: 'badRequest'
    }

  },


  fn: async function (inputs, exits) {

    // var shop = await Shop.find({
    //   id: inputs.shopId
    // })
    // //rating algorithm
    // var newRatings = (shop.ratings + inputs.selected) / 2;


    // newRatings.toFixed(2);

    if (inputs.shopRatings == 0) {
      await Shop.update({
        id: inputs.shopId
      }).set({
        ratings: inputs.selected
      })
    }

    if (inputs.shopRatings !== 0) {
      await Shop.update({
        id: inputs.shopId
      }).set({
        ratings: ((inputs.shopRatings + inputs.selected) / 2).toFixed(2)
      })
    }

    await Booking.update({
      id: inputs.bookingId
    }).set({
      ratings: inputs.selected,
      feedback: inputs.feedback,
      review: 'true'
    }).fetch();




    return exits.success();

  }


};
