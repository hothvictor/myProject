parasails.registerPage('manage-data', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    datas: [],
    shops: [],
    confirmDeleteDataModalOpen: false,
    confirmDeleteShopModalOpen: false,
    approveShopModalOpen: false,
    rejectShopModalOpen: false,
    selectedData: undefined,
    selectedShop: undefined,

    // form data
    approveFromData: {},
    rejectFormData: {},


    //Syncing / loading state
    syncing: false,

    //validation errors (not open two form at same time)
    formErrors: {},

    //server error state
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
    // delete user
    clickDeleteButton: function (dataId) {
      console.log('clicked id:', dataId);
      this.confirmDeleteDataModalOpen = true;
      this.selectedData = _.find(this.datas, {
        id: dataId
      });
    },
    closeDeleteDataModal: function () {
      this.selectedData = undefined;
      this.confirmDeleteDataModalOpen = false;
    },

    handleParsingDeleteDataForm: function () {
      return {
        id: this.selectedData.id
      };
    },

    submittedDeleteDataForm: function () {
      console.log('ok, it worked!');
      _.remove(this.datas, {
        id: this.selectedData.id
      });
      this.$forceUpdate();

      this.confirmDeleteDataModalOpen = false;
      this.selectedData = undefined;
    },

    // approve shop
    clickApproveButton: function (shopId) {
      console.log('Clicked the "approve" button! shopId: ', shopId);
      this.approveShopModalOpen = true;
      this.selectedShop = _.find(this.shops, {
        id: shopId
      });
      this.approveFromData.id = this.selectedShop.id;
      this.approveFromData.owner = this.selectedShop.owner;
      this.approveFromData.shopName = this.selectedShop.shopName;
      this.approveFromData.status = this.selectedShop.status;

    },

    _clearApproveShopModal: function () {
      this.selectedShop = undefined;
      this.approveShopModalOpen = false;
      this.approveFromData = {};
      this.cloudError = '';

    },

    closeApproveShopModal: function () {
      this._clearApproveShopModal();
    },

    handleParsingDeleteBookingForm: function () {
      return {
        id: this.selectedShop.id
      };
    },

    submittedApproveShopForm: function (result) {

      this.shops = _.reject(this.shops, {
        id: result.id
      })
      this.shops.push({
        id: result.id,
        owner: this.approveFromData.owner,
        shopName: this.approveFromData.shopName,
        status: 'Accepted',

      })
      console.log('ok, shop approved! ShopId:', result.id);
      // _.push(this.datas, {
      //   status: 'Accepted'
      // });
      this.$forceUpdate();

      this._clearApproveShopModal();
    },

    // reject shop
    clickRejectButton: function (shopId) {
      console.log('Clicked the "reject" button! shopId: ', shopId);
      this.rejectShopModalOpen = true;
      this.selectedShop = _.find(this.shops, {
        id: shopId
      });
      this.rejectFormData.shopName = this.selectedShop.shopName;
      this.rejectFormData.owner = this.selectedShop.owner;

    },

    _clearRejectShopModal: function () {
      this.selectedShop = undefined;
      this.rejectShopModalOpen = false;
      this.rejectFormData = {};
      this.cloudError = '';

    },

    closeRejectShopModal: function () {
      this._clearRejectShopModal();
    },

    handleParsingDeleteBookingForm: function () {
      return {
        id: this.selectedShop.id
      };
    },

    submittedRejectShopForm: function (result) {

      this.shops = _.reject(this.shops, {
        id: result.id
      })
      this.shops.push({
        id: result.id,
        owner: this.rejectFormData.owner,
        shopName: this.rejectFormData.shopName,
        status: 'Rejected',

      })
      console.log('ok, it worked!');
      this.$forceUpdate();
      this._clearRejectShopModal();
      // this.rejectShopModalOpen = false;
      // this.selectedShop = undefined;
      // window.location = '/admin';
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
    },

  }



});
