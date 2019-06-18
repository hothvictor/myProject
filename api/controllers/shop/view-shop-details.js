module.exports = {


  friendlyName: 'View shop details',


  description: 'Display "Shop details" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/shop/shop-details'
    }

  },


  fn: async function (inputs, exits) {

    var url = require('url');

    var shops = await Shop.find({
      id: this.req.params.id,
      status: 'Approved'
    }).populate('owner');

    var bookings = await Booking.find({
      review: true,
      shop: this.req.params.id,
    }).populate('customer');

    var checkShops = await Shop.find({
      id: this.req.params.id,
      status: 'Requested'
    })

    var shopId = this.req.params.id

    var rejectedShops = await Shop.find({
      id: this.req.params.id,
      status: 'Rejected'
    })

    _.each(shops, (shop) => {
      shop.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/shop/' + shop.id);
      delete shop.imageUploadFd;
      delete shop.imageUploadMine;
    })


    _.each(checkShops, (shop) => {
      shop.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/shop/' + shop.id);
      delete shop.imageUploadFd;
      delete shop.imageUploadMine;
    })
    // Respond with view.
    return exits.success({
      shops,
      checkShops,
      rejectedShops,
      bookings,
      shopId
    });

  }


};
