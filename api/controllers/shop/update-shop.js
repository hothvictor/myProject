module.exports = {


  friendlyName: 'Update shop',


  description: '',
  files: ['photo'],


  inputs: {

    photo: {
      //special input type 'ref'
      type: 'ref',
      description: 'Upload file stream',
      // required: true
    },

    id: {
      type: 'number'
    },

    shopName: {
      type: 'string'
    },

    shopDetail: {
      type: 'string'
    },

    // imageSrc: {
    //   type: 'string'
    // },

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
        id: 'number',
        imageSrc: 'string'
      }
    },

    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {


    var url = require('url');

    var info = await sails.uploadOne(inputs.photo);
    // console.log(info);
    // sails.uploadOne()

    if (!info) {
      // throw 'badRequest';
      await Shop.update({
        id: inputs.id
      }).set({
        shopName: inputs.shopName,
        shopDetail: inputs.shopDetail,
        phone: inputs.phone,
        // imageSrc: inputs.imageSrc,
        // imageUploadFd: info.fd,
        // imageUploadMine: info.type,
        district: inputs.district,
        address: inputs.address,
        openS1: inputs.openS1,
        closeS1: inputs.closeS1,
        openS2: inputs.openS2,
        closeS2: inputs.closeS2,
        closed: inputs.closed,
        facebook: inputs.facebook,
      }).fetch();

    } else {

      await Shop.update({
        id: inputs.id
      }).set({
        shopName: inputs.shopName,
        shopDetail: inputs.shopDetail,
        phone: inputs.phone,
        // imageSrc: inputs.imageSrc,
        imageUploadFd: info.fd,
        imageUploadMine: info.type,
        district: inputs.district,
        address: inputs.address,
        openS1: inputs.openS1,
        closeS1: inputs.closeS1,
        openS2: inputs.openS2,
        closeS2: inputs.closeS2,
        closed: inputs.closed,
        facebook: inputs.facebook,
      }).fetch();
    }

    return exits.success({
      id: inputs.id,
      // imageSrc: url.resolve(sails.config.custom.baseUrl, '/api/v1/shop/' + newShop.id)

    });

  }


};
