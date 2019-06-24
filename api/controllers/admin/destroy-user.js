module.exports = {


  friendlyName: 'Destroy user',


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
    var user = await User.findOne({

      id: inputs.id
    });

    if (!user) {
      throw 'not found';
    }


    await User.destroy({
      id: inputs.id
    }).fetch();

    var comment = await Comment.find({

      owner: inputs.id
    });

    if (comment != null) {
      await Comment.destroy({
        owner: inputs.id
      }).fetch();
    }

    var shop = await Shop.findOne({

      owner: inputs.id
    });

    if (shop != null) {
      await Shop.destroy({
        owner: inputs.id
      }).fetch();
    }

    var booking = await Booking.find({

      customer: inputs.id
    });

    if (booking != null) {
      await Booking.destroy({
        owner: inputs.id

      }).fetch();
      await Booking.destroy({
        customer: inputs.id,

      }).fetch();
    }


    return exits.success();

  }


};
