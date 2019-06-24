module.exports = {


  friendlyName: 'Destroy booking',


  description: '',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {


    await Booking.destroy({
      id: inputs.id
    });


    return exits.success();

  }


};
