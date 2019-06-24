module.exports = {


  friendlyName: 'Destroy comment',


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

    var comment = await Comment.findOne({

      id: inputs.id
    });

    // if (comment.owner !== this.req.me.id) {
    //   throw 'forbidden';
    // }

    await Comment.destroy({
      id: inputs.id
    });


    return exits.success();

  }


};
