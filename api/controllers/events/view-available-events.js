module.exports = {


  friendlyName: 'View available events',


  description: 'Display "Available events" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/events/available-events'
    }

  },


  fn: async function (inputs, exits) {

    var events = await Event.find();

    // Respond with view.
    return exits.success({
      events
    });

  }


};
