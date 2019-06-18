module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/homepage'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function (inputs, exits) {

    var url = require('url');

    // if (this.req.me) {
    //   throw {redirect:'/welcome'};
    // }
    var events = await Event.find().sort({
      "id": -1
    }).limit(1);

    var newss = await News.find().sort({
      "id": -1
    }).limit(2);

    // var latests = await News.find().sort({
    //   "id": -1
    // }).limit(3);

    var hots = await News.find().sort({
      "views": -1
    }).limit(1);

    var shops = await Shop.find({
      status: "Approved"

    }).sort({
      "id": -1,

    }).limit(3);

    _.each(shops, (shop) => {
      shop.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/shop/' + shop.id);
      delete shop.imageUploadFd;
      delete shop.imageUploadMine;
    })

    return exits.success({
      events,
      newss,
      hots,
      // latests,
      shops
    });

  }


};
