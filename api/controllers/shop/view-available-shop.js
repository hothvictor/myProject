module.exports = {


  friendlyName: 'View available shop',


  description: 'Display "Available shop" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/shop/available-shop'
    }

  },


  fn: async function (inputs, exits) {

    var url = require('url');

    var shops = await Shop.find({
      status: 'Approved'
    });



    _.each(shops, (shop) => {
      shop.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/shop/' + shop.id);
      delete shop.imageUploadFd;
      delete shop.imageUploadMine;
    })
    // Respond with view.
    return exits.success({
      shops,
      currentSection: 'shop',
    });

  }


};
