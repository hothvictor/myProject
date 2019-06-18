module.exports = {


  friendlyName: 'Retrieve data',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

   await Article.create({
     
   })
    return exits.success();

  }


};
