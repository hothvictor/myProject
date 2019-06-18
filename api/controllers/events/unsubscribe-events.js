module.exports = {


  friendlyName: 'Unsubscribe events',


  description: '',


  inputs: {
    email: {
      type: 'string',
      required: true
    }

  },


  exits: {
    success: {
      description: 'User was unsubscribed.'
    }

  },


  fn: async function (inputs, exits) {
    await User.update({
      emailAddress: inputs.email
    }).set({
      subscribe: 'No'
    })

    return exits.success();

  }


};
