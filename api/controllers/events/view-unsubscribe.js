module.exports = {


  friendlyName: 'View unsubscribe',


  description: 'Display "Unsubscribe" page.',


  inputs: {

    email: {
      description: 'User email.',
      example: 'user@exmaple.com'
    }

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/events/unsubscribe'
    },

    invalidEmail: {
      responseType: 'invalid',
      description: 'The provided email is invalid.',
    }


  },


  fn: async function (inputs, exits) {
    // email is invalid
    if (!inputs.email) {
      sails.log.warn('Attempting to view unsubscribe page, but no email included in request!  Displaying error page...');
      throw 'invalidEmail';
    }

    // look up the user with the email
    var user = await User.findOne({
      emailAddress: inputs.email,
    })

    if (!user) {
      throw 'invalidEmail';
    }

    // Respond with view.
    return exits.success({
      email: inputs.email
    });

  }


};
