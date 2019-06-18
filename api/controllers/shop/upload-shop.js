module.exports = {


  friendlyName: 'Upload clinic',


  description: 'Create clinic into database',

  files: ['photo'],

  inputs: {

    photo: {
      //special input type 'ref'
      type: 'ref',
      description: 'Upload file stream',
      // required: true
    },

    shopName: {
      type: 'string'
    },

    shopDetail: {
      type: 'string'
    },

    imageSrc: {
      type: 'string'
    },

    district: {
      type: 'string'
    },

    address: {
      type: 'string'
    },

    phone: {
      type: 'number'
    },

    openS1: {
      type: 'string'
    },

    closeS1: {
      type: 'string'
    },

    openS2: {
      type: 'string'
    },

    closeS2: {
      type: 'string'
    },
    closed: {
      type: 'string'
    },

    facebook: {
      type: 'string'
    },

  },


  exits: {
    success: {
      outputDescription: 'information about the created record',
      outputType: {
        id: 'string',
        imageSrc: 'string'
      }
    },

    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    }

  },


  fn: async function (inputs, exits) {
    // var now = Date(Date.now());
    // var detail = inputs.shopDetail;
    // detail = detail.toString().replace("<", "&lt;");
    // detail = detail.toString().replace(">", "&gt;");

    var url = require('url');

    var info = await sails.uploadOne(inputs.photo);
    // console.log(info);
    // sails.uploadOne()

    if (!info) {
      throw 'badRequest';

    }

    await User.update({
      id: this.req.me.id,
    }).set({
      // set to 1 mean that user have one shop
      shopNo: 1,
    }).fetch()


    var newShop = await Shop.create({
      owner: this.req.me.id,
      shopName: inputs.shopName,
      shopDetail: inputs.shopDetail,
      phone: inputs.phone,
      imageUploadFd: info.fd,
      imageUploadMine: info.type,
      // imageSrc: inputs.imageSrc,
      district: inputs.district,
      address: inputs.address,
      openS1: inputs.openS1,
      closeS1: inputs.closeS1,
      openS2: inputs.openS2,
      closeS2: inputs.closeS2,
      closed: inputs.closed,
      facebook: inputs.facebook,
      status: 'Requested',
    }).fetch();

    return exits.success({
      id: newShop.id,
      imageSrc: url.resolve(sails.config.custom.baseUrl, '/api/v1/shop/' + newShop.id)

    });


  }
};
