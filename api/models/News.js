/**
 * News.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    newsName: {
      type: 'String',
      example: 'News Name',
      description: 'News Name.',
      required: true

    },

    newsDetail: {
      type: 'string',
      description: 'news details, location, information',
      required: true

    },

    date: {
      type: 'string',
      description: 'Date of news',
      // required: true

    },

    imageSrc: {
      type: 'string',
      description: 'Path of image',
      required: true

    },

    newsSrc: {
      type: 'string',
      description: 'Path of image',

    },

    views:{
      type: 'number',
      description: 'Number of views of the article.'
    },

    owner: {
      model: 'User',
      required: true

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

  },

};
