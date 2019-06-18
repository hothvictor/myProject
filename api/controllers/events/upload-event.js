module.exports = {


  friendlyName: 'Upload event',


  description: 'upload a new event',



  inputs: {
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
        id: 'string',
        // imageSrc: 'string'
      }
    },

    badRequest: {
      description: 'Form error.',
      responseType: 'badRequest'
    }

  },


  fn: async function (inputs, exits) {


    var users = await User.find({
      subscribe: 'Yes'
    });


    var newEvent = await Event.create({
      owner: this.req.me.id,
      eventName: inputs.eventName,
      eventDetail: inputs.eventDetail,
      date: inputs.date,
      imageSrc: inputs.imageSrc,
      eventSrc: inputs.eventSrc,
    }).fetch();

    users.forEach(async element => {
      await sails.helpers.sendTemplateEmail.with({
        to: element.emailAddress,
        subject: 'New event - ' + inputs.eventName,
        template: 'email-event-notification',
        templateData: {
          email: element.emailAddress,
          user: element.fullName,
          eventName: inputs.eventName,
          eventDetail: inputs.eventDetail,
          date: inputs.date,
          imageSrc: inputs.imageSrc,
          eventSrc: inputs.eventSrc,
        }
      });
    });

    return exits.success({
      id: newEvent.id,
    });

  }


};
