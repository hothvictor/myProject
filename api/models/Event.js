  /**
   * Event.js
   *
   * @description :: A model definition.  Represents a database table/collection/etc.
   * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
   */

  module.exports = {

    attributes: {

      eventName: {
        type: 'String',
        example: 'Event Name',
        description: 'Event Name.',
        required: true

      },

      eventDetail: {
        type: 'string',
        description: 'event details, location, information',
        required: true

      },

      date: {
        type: 'string',
        description: 'Date of event',
        required: true

      },

      imageSrc: {
        type: 'string',
        description: 'Path of image',
        required: true

      },

      eventSrc: {
        type: 'string',
        description: 'Path of image',
        required: true

      },

      owner: {
        model: 'User',
        required: true

      }

      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


      //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
      //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
      //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


      //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
      //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
      //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },

  };
