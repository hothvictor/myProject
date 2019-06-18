module.exports = {


  friendlyName: 'Upload news',


  description: 'upload news',


  inputs: {

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
    var now = Date(Date.now());
    var detail = inputs.newsDetail;
    // detail = detail.toString().replace("<", "&lt;");
    // detail = detail.toString().replace(">", "&gt;");


    var newNews = await News.create({
      owner: this.req.me.id,
      newsName: inputs.newsName,
      newsDetail: detail,
      date: now,
      imageSrc: inputs.imageSrc,
      newsSrc: inputs.newsSrc,
    }).fetch();

    return exits.success({
      id: newNews.id,
    });

  }


};
