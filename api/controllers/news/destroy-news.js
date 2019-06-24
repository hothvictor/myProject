module.exports = {


  friendlyName: 'Destroy news',


  description: 'delete selected news from database',


  inputs: {
    id: {
      type: 'number',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var news = await News.findOne({

      id: inputs.id
    });

    if(news.owner !== this.req.me.id){
      throw 'forbidden';
    }

    await News.destroy({ id: inputs.id});



    return exits.success();

  }


};
