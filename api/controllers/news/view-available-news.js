module.exports = {


  friendlyName: 'View available news',


  description: 'Display "Available news" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/news/available-news'
    }

  },

  // json: function(req, res){

  //   News.find().exec(function (err, newss){
  //     return res.json(newss);
  //   })
  // },

  fn: async function (inputs, exits) {

    var newss = await News.find();


    // Respond with view.
    return exits.success({
      newss,
    });

  }


};
