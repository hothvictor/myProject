module.exports = {


  friendlyName: 'Update news',


  description: '',


  inputs: {

    id: {
      type: 'number'
    },

    newsName: {
      type: 'string'
    },

    newsDetail: {
      type: 'string'
    },

    // date: {
    //   type: 'string'
    // },

    imageSrc: {
      type: 'string'
    },

    newsSrc: {
      type: 'string'
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
    await News.update({
      id: inputs.id
    }).set({
      newsName: inputs.newsName,
      newsDetail: inputs.newsDetail,
      imageSrc: inputs.imageSrc,
      newsSrc: inputs.newsSrc,
    }).fetch();


    return exits.success({
      id: inputs.id

    });

  }


};
