module.exports = {


  friendlyName: 'Download photo',


  description: '',


  inputs: {
    id: {
      description: 'id of image',
      type: 'number',
      required: true
    }

  },


  exits: {
    success: {
      outputDescription: 'Bytes of image',
      outputType: 'ref'
    },

    notFound: {
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {

    var thing = await Thing.findOne({
      id: inputs.id
    });

    if (!thing) {
      throw 'notFound';
    }

    var friends = await User.findOne({id: this.req.me.id}).populate('friends');
    if(this.req.me.id !== thing.owner && !_.any(friends, { id:thing.owner})){
      throw 'forbidden';
    }

    this.res.type(thing.imageUploadMine);

    var downloading = await sails.startDownload(thing.imageUploadFd);

    return exits.success(downloading);

  }


};
