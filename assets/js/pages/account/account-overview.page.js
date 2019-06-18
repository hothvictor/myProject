parasails.registerPage('account-overview', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    shops: [],
    confirmDeleteShopModalOpen: false,
    selected: undefined,
    selectedShop: undefined,
    uploadShopModalOpen: false,
    updateShopModalOpen: false,

    subscribeModalOpen: false,
    unsubscribeModalOpen: false,


    isBillingEnabled: false,

    hasBillingCard: false,

    // Syncing/loading states for this page.
    syncingOpenCheckout: false,
    syncingUpdateCard: false,
    syncingRemoveCard: false,

    // Form data
    formData: {
      /* … */
    },

    uploadFormData: {},
    updateFormData: {},

    // Server error state for the form
    cloudError: '',

    //Syncing / loading state
    syncing: false,

    //validation errors (not open two form at same time)
    formErrors: {},

    // For the Stripe checkout window
    checkoutHandler: undefined,

    // For the confirmation modal:
    removeCardModalVisible: false,


  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    _.extend(this, window.SAILS_LOCALS);

    this.isBillingEnabled = !!this.stripePublishableKey;

    // Determine whether there is billing info for this user.
    this.me.hasBillingCard = (
      this.me.billingCardBrand &&
      this.me.billingCardLast4 &&
      this.me.billingCardExpMonth &&
      this.me.billingCardExpYear
    );
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickStripeCheckoutButton: async function () {

      // Prevent double-posting if it's still loading.
      if (this.syncingUpdateCard) {
        return;
      }

      // Show syncing state for opening checkout.
      this.syncingOpenCheckout = true;

      // Clear out error states.
      this.cloudError = false;

      // Open Stripe Checkout.
      var billingCardInfo = await parasails.util.openStripeCheckout(this.stripePublishableKey, this.me.emailAddress);
      // Clear the loading state for opening checkout.
      this.syncingOpenCheckout = false;
      if (!billingCardInfo) {
        // (if the user canceled the dialog, avast)
        return;
      }

      // Now that payment info has been successfully added, update the billing
      // info for this user in our backend.
      this.syncingUpdateCard = true;
      await Cloud.updateBillingCard.with(billingCardInfo)
        .tolerate(() => {
          this.cloudError = true;
        });
      this.syncingUpdateCard = false;

      // Upon success, update billing info in the UI.
      if (!this.cloudError) {
        Object.assign(this.me, _.pick(billingCardInfo, ['billingCardLast4', 'billingCardBrand', 'billingCardExpMonth', 'billingCardExpYear']));
        this.me.hasBillingCard = true;
      }
    },

    clickRemoveCardButton: async function () {
      this.removeCardModalVisible = true;
    },

    closeRemoveCardModal: async function () {
      this.removeCardModalVisible = false;
      this.cloudError = false;
    },

    submittedRemoveCardForm: async function () {

      // Update billing info on success.
      this.me.billingCardLast4 = undefined;
      this.me.billingCardBrand = undefined;
      this.me.billingCardExpMonth = undefined;
      this.me.billingCardExpYear = undefined;
      this.me.hasBillingCard = false;

      // Close the modal and clear it out.
      this.closeRemoveCardModal();

    },

    handleParsingRemoveCardForm: function () {
      return {
        // Set to empty string to indicate the default payment source
        // for this customer is being completely removed.
        stripeToken: ''
      };
    },

    // delete
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
      window.location = '/account';

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


      if (!argins.photo) {
        this.formErrors.photo = true;
      }

      // if (!argins.imageSrc) {
      //   this.formErrors.imageSrc = true;
      // }

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
        // imageSrc: this.uploadFormData.imageSrc,
        district: this.uploadFormData.district,
        address: this.uploadFormData.address,
        phone: this.uploadFormData.phone,
        openS1: this.uploadFormData.openS1,
        closeS1: this.uploadFormData.closeS1,
        openS2: this.uploadFormData.openS2,
        closeS2: this.uploadFormData.closeS2,
        closed: this.uploadFormData.closed,
        facebook: this.uploadFormData.facebook,
        id: result.id,
        owner: {
          id: this.me,
          fullName: this.me.fullName
        }
      })
      console.log('Shop uploaded!', result.id);

      // this.$forceUpdate();


      this._clearUploadShopModal();
      window.location = '/account';


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
      this.updateFormData.openS1 = this.updateShop.openS1;
      this.updateFormData.closeS1 = this.updateShop.closeS1;
      this.updateFormData.openS2 = this.updateShop.openS2;
      this.updateFormData.closeS2 = this.updateShop.closeS2;
      this.updateFormData.closed = this.updateShop.closed;
      this.updateFormData.phone = this.updateShop.phone;
      this.updateFormData.facebook = this.updateShop.facebook;
      this.updateFormData.imageSrc = '/api/v1/shop/' + this.updateShop.id;

      this.updateFormData.address = this.updateShop.address;
      this.updateFormData.district = this.updateShop.district;
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

      // if (!argins.imageSrc) {
      //   this.formErrors.imageSrc = true;
      // }

      // Validate photo:
      // if (!argins.photo) {
      //   this.formErrors.photo = true;
      // }

      if (!argins.address) {
        this.formErrors.address = true;
      }
      return argins;
    },

    submittedUpdateShopForm: function (updateId) {

      // this.$forceUpdate();
      var checkStatus = _.find(this.shops, {
        id: updateId.id
      })

      console.log('Shop updated!', updateId.id);
      this._clearUpdateShopModal();
      if (checkStatus.status == "Requested") {
        window.location = '/account';
      }

      if (checkStatus.status == "Approved") {
        window.location = 'shop/' + updateId.id;
      }
    },

    openFile: function (event) {
      var input = event.target;
      var uploadimage = input.files[0];
      if (!uploadimage) {
        this.uploadFormData.photo = undefined;
        return;
      }

      var reader = new FileReader();
      reader.onload = function () {
        var dataURL = reader.result;
        var output = document.getElementById('output');
        output.src = dataURL;
      };
      reader.readAsDataURL(input.files[0]);
      this.uploadFormData.photo = uploadimage;
      console.log(this.uploadFormData.photo);
    },

    openUpdateFile: function (event) {
      var input = event.target;
      var uploadimage = input.files[0];
      if (!uploadimage) {
        this.updateFormData.photo = undefined;
        return;
      }

      var reader = new FileReader();
      reader.onload = function () {
        var dataURL = reader.result;
        var output = document.getElementById('output');
        output.src = dataURL;
      };
      reader.readAsDataURL(input.files[0]);
      this.updateFormData.photo = uploadimage;
      console.log(this.uploadFormData.photo);
    },

    // subscribe
    clickSubscribeButton: function (userId) {
      console.log('clicked the "subscribe" button! userId: ', userId);
      this.subscribeModalOpen = true;
      this.selected = userId
    },

    closeSubscribeModal: function () {
      this.subscribeModalOpen = false;
      this.selected = undefined;
    },

    handleParsingSubscribeForm: function () {
      return {
        id: this.selected
      };
    },


    submittedSubscribeForm: function () {
      console.log('ok, it worked!');
      this.subscribeModalOpen = false;
      this.selected = undefined;
      window.location = '/account';
    },

     // unsubscribe
     clickUnsubscribeButton: function (userId) {
      console.log('clicked the "unsubscribe" button! user email: ', userId);
      this.unsubscribeModalOpen = true;
      this.selected = userId
    },

    closeUnsubscribeModal: function () {
      this.unsubscribeModalOpen = false;
      this.selected = undefined;
    },

    handleParsingUnsubscribeForm: function () {
      return {
        email: this.selected
      };
    },


    submittedUnsubscribeForm: function () {
      console.log('ok, it worked!');
      this.unsubscribeModalOpen = false;
      this.selected = undefined;
      window.location = '/account';
    },


  }
});
