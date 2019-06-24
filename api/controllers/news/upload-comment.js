module.exports = {


  friendlyName: 'Upload news comment',


  description: 'Upload comment',



  inputs: {
    comment: {
      type: 'string'
    },
    article: {
      type: 'number'
    }

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
    var now = Date(Date.now());

    var newComment = await Comment.create({
      owner: this.req.me.id,
      comment: inputs.comment,
      article: inputs.article,
      date: now,
    }).fetch();

    return exits.success({
      id: newComment.id,
    });
  }


};
