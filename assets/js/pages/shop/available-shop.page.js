parasails.registerPage('available-shop', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    shops: [],
    confirmDeleteShopModalOpen: false,
    selectedShop: undefined,
    selectedKeyWord: undefined,
    uploadShopModalOpen: false,
    updateShopModalOpen: false,

    //form data **************
    uploadFormData: {},

    updateFormData: {},


    //Syncing / loading state
    syncing: false,

    //validation errors (not open two form at same time)
    formErrors: {},

    //server error state
    cloudError: '',

    search: '',

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

    clickDeleteShop: function (shopId) {
      console.log('clicked the "delete" button! shopId: ', shopId);
      this.confirmDeleteShopModalOpen = true;
      this.selectedShop = _.find(this.shops, {
        id: shopId
      });
    },
    closeDeleteShopModal: function () {
      this.selectedShop = undefined;
      this.confirmDeleteShopModalOpen = false;
    },

    handleParsingDeleteShopForm: function () {
      return {
        id: this.selectedShop.id
      };
    },

    submittedDeleteShopForm: function () {
      console.log('ok, it worked!');
      _.remove(this.shops, {
        id: this.selectedShop.id
      });
      this.$forceUpdate();

      this.confirmDeleteShopModalOpen = false;
      this.selectedShop = undefined;
    },

    //upload
    clickAddButton: function () {
      this.uploadShopModalOpen = true;

    },


    _clearUploadShopModal: function () {
      //close modal
      this.uploadShopModalOpen = false;
      //reset form data**********************
      this.uploadFormData = {};
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUploadShopModal: function () {
      this._clearUploadShopModal();
    },

    handleParsingUploadShopForm: function () {
      this.formErrors = {};

      var argins = this.uploadFormData;

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      // Validation
      if (!argins.shopName) {
        this.formErrors.shopName = true;
      }

      if (!argins.shopDetail) {
        this.formErrors.shopDetail = true;
      }

      if (!argins.imageSrc) {
        this.formErrors.imageSrc = true;
      }

      if (!argins.address) {
        this.formErrors.address = true;
      }

      if (!argins.phone) {
        this.formErrors.phone = true;
      }



      // Validate photo:
      // if (!argins.photo) {
      //   this.formErrors.photo = true;
      // }
      return argins;
    },

    submittedUploadShopForm: function (result) {

      this.shops.push({
        shopName: this.uploadFormData.shopName,
        shopDetail: this.uploadFormData.shopDetail,
        // date: this.uploadFormData.date,
        imageSrc: this.uploadFormData.imageSrc,
        address: this.uploadFormData.address,
        id: result.id,
        owner: {
          id: this.me,
          fullName: this.me.fullName
        }
      })
      console.log('Shop uploaded!');
      // this.$forceUpdate();


      this._clearUploadShopModal();

    },


    //update modal
    clickUpdateButton: function (shopId) {
      this.updateShopModalOpen = true;
      this.updateShop = _.find(this.shops, {
        id: shopId
      });
      //shop data
      this.updateFormData.id = this.updateShop.id;
      this.updateFormData.shopName = this.updateShop.shopName;
      this.updateFormData.shopDetail = this.updateShop.shopDetail;
      // this.updateFormData.date = this.updateShop.date;
      this.updateFormData.imageSrc = this.updateShop.imageSrc;
      this.updateFormData.address = this.updateShop.address;
      console.log('clicked the "update" button! shopId: ', shopId);


    },

    _clearUpdateShopModal: function () {
      //close modal
      this.updateShopModalOpen = false;
      //reset form data**********************
      this.updateFormData = {};
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUpdateShopModal: function () {
      this._clearUpdateShopModal();
    },

    handleParsingUpdateShopForm: function () {
      this.formErrors = {};

      var argins = this.updateFormData;

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      // Validate label:
      if (!argins.shopName) {
        this.formErrors.shopName = true;
      }

      if (!argins.shopDetail) {
        this.formErrors.shopDetail = true;
      }

      // if (!argins.date) {
      //   this.formErrors.date = true;
      // }

      if (!argins.imageSrc) {
        this.formErrors.imageSrc = true;
      }

      if (!argins.address) {
        this.formErrors.address = true;
      }
      return argins;
    },

    submittedUpdateShopForm: function (result) {

      console.log('Shop updated!');
      this._clearUpdateShopModal();
      window.location = '/shop';

    },

    // click district
    clickKeyWord: function (key) {
      console.log('District: ', key);
      this.selectedKeyWord = key;
    },




  },

  computed: {
    filterShop: function () {
      var matcher = new RegExp(this.search, 'i')
      return this.shops.filter(function (shop) {
        return matcher.test(shop.shopName) || matcher.test(shop.address)
      })
    },
  }
});
