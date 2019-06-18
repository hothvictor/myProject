module.exports = {


  friendlyName: 'Destroy one thing',


  description: 'Delete "thing" by specificed ID from the database',


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

    var thing = await Thing.findOne({
      id: inputs.id
    });

if(!thing){
  throw 'not found';
}

    if(thing.owner !== this.req.me.id){
      throw 'forbidden';
    }

    await Thing.destroy({ id: inputs.id});

    return exits.success();

  }


};
