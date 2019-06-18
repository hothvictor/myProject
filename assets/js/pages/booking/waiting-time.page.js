parasails.registerPage('waiting-time', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    // Main syncing/loading state for this page.
    shops: [],
    syncing: false,

    selectedShop: undefined,
    resetModalOpen: false,


    // Form data
    formData: {
      /* … */
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {
      /* … */
    },

    // Server error state for the form
    cloudError: '',

    numberOfPeople: '',


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
    clickResetButton: function (shopId) {
      console.log('clicked the "reset" button! shopId: ', shopId);
      this.resetModalOpen = true;
      this.selectedShop = _.find(this.shops, {
        id: shopId
      });
    },
    closeResetModal: function () {
      this.selectedShop = undefined;
      this.resetModalOpen = false;
    },

    handleParsingResetForm: function () {
      return {
        id: this.selectedShop.id
      };
    },

    submittedResetForm: function (result) {

      this.shops = _.reject(this.shops, {
        id: result.id
      })
      this.shops.push({
        id: result.id,
        waitingTime: 0,
        updateTime: Date(Date.now()),
      })

      console.log('ok, it worked!');

      this.$forceUpdate();

      this.resetModalOpen = false;
      this.selectedShop = undefined;
    },

    estimateMin: function () {
      return this.formData.minutes = this.formData.numOfPeople * 12

    },

    submittedForm: async function () {
      this.syncing = true;
      window.location = '/waiting-time';
    },

    handleParsingForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      if (!argins.waitingTime) {
        this.formErrors.waitingTime = true;
      }





      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },


  },
  computed: {
    result: function () {
      return this.numberOfPeople * 12;
    },

    today: function () {
      return new Date().getTime();
    }
  }

});
