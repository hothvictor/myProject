module.exports = {


  friendlyName: 'Reset waiting time',


  description: '',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      outputDescription: 'information about the created record',
      outputType: {
        id: 'number',
        // imageSrc: 'string'
      }
    },

    badRequest: {
      description: 'Form error.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    await Shop.update({
      id: inputs.id
    }).set({
      waitingTime: 0,
      updateTime: Date(Date.now())
    }).fetch();

    return exits.success({
      id: inputs.id
    });

  }


};
