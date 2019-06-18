module.exports = {


  friendlyName: 'Destroy event',


  description: 'Delete one event from database',


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  exits: {
    forbidden: {
      description: 'The user making this request dosen\'t have the permissions to delete this thing.',
      responseType: 'forbidden'
    }

  },


  fn: async function (inputs, exits) {

    var event = await Event.findOne({

      id: inputs.id
    });



    await Event.destroy({ id: inputs.id});


    return exits.success();

  }


};
