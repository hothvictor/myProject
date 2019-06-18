module.exports = {


  friendlyName: 'View manage data',


  description: 'Display "Manage data" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/manage-data'
    }

  },


  fn: async function (inputs, exits) {

    var datas = await User.find({
      isSuperAdmin: 'false'
    }).sort({
      "id": -1,
    });

    var shops = await Shop.find().sort({
      "id": -1,
    }).populate('owner');;

    // Respond with view.
    return exits.success({
      datas,
      shops
    });
  }


};
