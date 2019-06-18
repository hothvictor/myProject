/**
 * Booking.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // service: {
    //   type: 'string',
    //   required: true
    // },

    remarks: {
      type: 'string'
    },

    time: {
      type: 'string',
      required: true
    },

    date: {
      type: 'string',
      required: true
    },

    code: {
      type: 'number',
      // required: true
    },

    status: {
      type: 'string',
      required: true,
      isIn: ['Requested', 'Accepted', 'Declined', 'Completed'],
    },

    review: {
      type: 'string',
      isIn: ['true', 'false'],

    },

    customer: {
      model: 'User',
      required: true,
      description: 'patient id'
    },

    ratings: {
      type: 'number'
    },

    feedback: {
      type: 'string'
    },
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    owner: {
      model: 'User',
      required: true,
      description: 'shop owner'
    },

    shop: {
      model: 'Shop',
      required: true,
      description: 'shop id'
    }
  },

};
