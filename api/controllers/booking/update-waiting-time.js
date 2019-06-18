module.exports = {


  friendlyName: 'Update waiting time',


  description: '',


  inputs: {

    shopId: {
      type: 'string',
      required: true
    },

    waitingTime: {
      type: 'number',
      required: true
    },

  },


  exits: {
    success: {
      outputDescription: 'information about the created record',
      outputType: {
        id: 'string',
      }
    },

    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    }

  },


  fn: async function (inputs, exits) {

    await Shop.update({
      id: inputs.shopId
    }).set({
      waitingTime: inputs.waitingTime,
      updateTime: Date(Date.now())
    })

    return exits.success();

  }


};
