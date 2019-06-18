module.exports = {


  friendlyName: 'View account overview',


  description: 'Display "Account Overview" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/account-overview',
    }

  },


  fn: async function (inputs, exits) {

    var url = require('url');


    // If billing features are enabled, include our configured Stripe.js
    // public key in the view locals.  Otherwise, leave it as undefined.
    var shops = await Shop.find({
      owner: this.req.me.id
    });


    _.each(shops, (shop) => {
      shop.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/shop/' + shop.id);
      delete shop.imageUploadFd;
      delete shop.imageUploadMine;
    })

    return exits.success({
      shops,
      stripePublishableKey: sails.config.custom.enableBillingFeatures ? sails.config.custom.stripePublishableKey : undefined,
    });

  }


};
