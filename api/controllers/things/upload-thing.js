module.exports = {


  friendlyName: 'Upload thing',


  description: '',

  files: ['photo'],


  inputs: {
    photo: {
      //special input type 'ref'
      type: 'ref',
      description: 'Upload file stream',
      required: true
    },
    label: {
      type: 'string'
    }
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

    var url = require('url');

    var info = await sails.uploadOne(inputs.photo);
    // console.log(info);
    // sails.uploadOne()

    if (!info) {
      throw 'badRequest';

    }

    // if(info.type !== "image/png" || info.type !== "image/jpg" || info.type !== "image/jepg" || info.type !== "image/gif"){
    //   throw 'badRequest';
    // }

    var newThing = await Thing.create({
      imageUploadFd: info.fd,
      imageUploadMine: info.type,
      owner: this.req.me.id,
      label: inputs.label
    }).fetch();

    return exits.success({
      id: newThing.id,
      imageSrc: url.resolve(sails.config.custom.baseUrl, '/api/v1/things/' + newThing.id)

    });

  }


};
