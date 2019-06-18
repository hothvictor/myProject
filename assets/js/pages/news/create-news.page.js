parasails.registerPage('create-news', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    // Form data
    formData: {
      /* … */
      
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {
      /* … */
    },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
    handleParsingForm: function () {
      this.formErrors = {};

      var argins = this.formData;

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      // Validation
      if (!argins.newsName) {
        this.formErrors.newsName = true;
      }

      if (!argins.newsDetail) {
        this.formErrors.newsDetail = true;
      }

      // if (!argins.date) {
      //   this.formErrors.date = true;
      // }

      if (!argins.imageSrc) {
        this.formErrors.imageSrc = true;
      }

      if (!argins.newsSrc) {
        this.formErrors.newsSrc = true;
      }

      return argins;
    },
    submittedForm: async function () {

      console.log('News uploaded!');
      this.syncing = true;
      window.location = '/news';

    },
  }
});
