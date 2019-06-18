module.exports = {


  friendlyName: 'Shop photo',


  description: '',


  inputs: {

    id: {
      description: 'id of image',
      type: 'string',
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
    var shop = await Shop.findOne({
      id: inputs.id
    });

    this.res.type(shop.imageUploadMine);

    var shopImage = await sails.startDownload(shop.imageUploadFd);


    return exits.success(shopImage);

  }


};
