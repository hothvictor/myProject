module.exports = {


  friendlyName: 'Subscribe events',


  description: '',


  inputs: {
    id: {
      type: 'number'
    }

  },


  exits: {
    success: {
      description: 'User was subscribed.'
    }

  },


  fn: async function (inputs, exits) {
    await User.update({
      id: inputs.id
    }).set({
      subscribe: 'Yes'
    })

    return exits.success();

  }


};
