module.exports = {


  friendlyName: 'Update event',


  description: 'Update selected event.',


  inputs: {

    id: {
      type: 'number'
    },

    eventName: {
      type: 'string'
    },

    eventDetail: {
      type: 'string'
    },

    date: {
      type: 'string'
    },

    imageSrc: {
      type: 'string'
    },

    eventSrc: {
      type: 'string'
    },

  },


  exits: {
    success: {
      outputDescription: 'information about the created record',
      outputType: {
        id: 'number',
      }
    },

    badRequest: {
      description: 'Form error.',
      responseType: 'badRequest'
    }

  },


  fn: async function (inputs, exits) {

    await Event.update({
        id: inputs.id
      })
      .set({
        eventName: inputs.eventName,
        eventDetail: inputs.eventDetail,
        date: inputs.date,
        imageSrc: inputs.imageSrc,
        eventSrc: inputs.eventSrc,
      }).fetch();

    return exits.success({
      id: inputs.id,
    });

  }


};
