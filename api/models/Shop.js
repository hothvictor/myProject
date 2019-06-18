/**
 * Shop.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    shopName: {
      type: 'string',
      required: true,
    },

    shopDetail: {
      type: 'string',
      required: true,

    },

    district: {
      type: 'string',
      isIn: ['Hong Kong Island', 'Kowloon', 'New Territories'],

    },

    address: {
      type: 'string',
      required: true,

    },

    phone: {
      type: 'number',
      required: true,

    },

    // imageSrc: {
    //   type: 'string',
    //   required: true,

    // },

    openS1: {
      type: 'string',

    },

    closeS1: {
      type: 'string',
    },

    openS2: {
      type: 'string',

    },

    closeS2: {
      type: 'string',
    },

    closed: {
      type: 'string',
      required: true,

    },

    facebook: {
      type: 'string'
    },

    status: {
      type: 'string',
      isIn: ['Requested', 'Approved', 'Rejected'],
    },

    ratings: {
      type: 'number'
    },


    imageUploadFd: {
      type: 'string',
      description: 'identifies the uploaded image',
      required: true
    },

    imageUploadMine: {
      type: 'string',
      description: 'the type for upload image.',
      required: true
    },

    waitingTime: {
      type: 'number',
      description: 'waiting time of walk-in client'
    },

    updateTime:{
      type:'text',
      description: 'Record update time about waiting time'
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
      required: true
    },

    // reservedBy: {
    //   model: 'User',
    //   description: 'the id who reserved, can be null (no booking)'
    // }
  },

};
