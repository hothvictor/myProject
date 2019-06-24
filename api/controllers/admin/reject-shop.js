module.exports = {


  friendlyName: 'Reject shop',


  description: '',


  inputs: {
    id: {
      type: 'number'
    },

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
      status: 'Rejected'
    }).fetch()

    return exits.success({
      id: inputs.id
    });

  }


};
