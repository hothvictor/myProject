parasails.registerPage('available-booking', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    datas: [],
    books: [],
    confirmDeleteModalOpen: false,
    confirmReviewModalOpen: false,
    confirmDeleteBookingModalOpen: false,
    confirmBookingModalOpen: false,
    confirmViewModalOpen: false,
    declineBookingModalOpen: false,
    selectedBooking: undefined,
    selectedDeleteBooking: undefined,

    finishBookingModalOpen: false,
    // Form data      
    formData: {
      /* … */
    },

    confirmBookingFormData: {},
    declineBookingFormData: {},
    finishBookingFormData: {},

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
    // delete booking (User)
    clickDeleteBooking: function (bookingId) {
      console.log('Clicked the "delete" button! bookingId: ', bookingId);
      this.confirmDeleteBookingModalOpen = true;
      this.selectedDeleteBooking = _.find(this.books, {
        id: bookingId
      });
    },

    closeDeleteModal: function () {
      this.selectedDeleteBooking = undefined;
      this.confirmDeleteBookingModalOpen = false;
    },

    handleParsingDeleteForm: function () {
      return {
        id: this.selectedDeleteBooking.id
      };
    },

    submittedDeleteForm: function () {
      console.log('ok, it worked!');
      _.remove(this.books, {
        id: this.selectedDeleteBooking.id
      });
      this.$forceUpdate();

      this.confirmDeleteBookingModalOpen = false;
      this.selectedDeleteBooking = undefined;
    },



    // delete booking (admin)
    clickDeleteButton: function (bookingId) {
      console.log('Clicked the "delete" button! bookingId: ', bookingId);
      this.confirmDeleteModalOpen = true;
      this.selectedBooking = _.find(this.datas, {
        id: bookingId
      });
    },

    closeDeleteBookingModal: function () {
      this.selectedBooking = undefined;
      this.confirmDeleteModalOpen = false;
    },

    handleParsingDeleteBookingForm: function () {
      return {
        id: this.selectedBooking.id
      };
    },

    submittedDeleteBookingForm: function () {
      console.log('ok, it worked!');
      _.remove(this.datas, {
        id: this.selectedBooking.id
      });
      this.$forceUpdate();

      this.confirmDeleteModalOpen = false;
      this.selectedBooking = undefined;
    },

    // confirm booking 
    clickConfirmButton: function (bookingId) {
      console.log('Clicked the "confirm" button! bookingId: ', bookingId);
      this.confirmBookingModalOpen = true;
      this.selectedBooking = _.find(this.datas, {
        id: bookingId
      });
      this.confirmBookingFormData.code = this.selectedBooking.code;
      this.confirmBookingFormData.date = this.selectedBooking.date;
      this.confirmBookingFormData.time = this.selectedBooking.time;
      this.confirmBookingFormData.remarks = this.selectedBooking.remarks;
      // this.confirmBookingFormData.customerAddress = this.selectedBooking.customer.emailAddress;
      // this.confirmBookingFormData.shopName = this.selectedBooking.shop.shopName;
      // this.confirmBookingFormData.status = this.selectedBooking.status;



    },


    _clearConfirmBookingModal: function () {
      this.selectedBooking = undefined;
      this.confirmBookingModalOpen = false;
      this.confirmBookingFormData = {};
      this.cloudError = '';

    },

    closeConfirmBookingModal: function () {
      this._clearConfirmBookingModal();
    },

    handleParsingDeleteBookingForm: function () {
      return {
        id: this.selectedBooking.id
      };
    },

    submittedConfirmBookingForm: function (result) {
      console.log('Booking confirmed!', result.id);

      this.datas = _.reject(this.datas, {
        id: result.id
      })
      this.datas.push({
        id: result.id,
        // shop: this.confirmBookingFormData.shopName,
        date: this.confirmBookingFormData.date,
        time: this.confirmBookingFormData.time,
        status: 'Accepted',
        code: this.confirmBookingFormData.code,

      })
      // _.push(this.datas, {
      //   status: 'Accepted'
      // });
      // this.datas.find({
      //   id: result.id
      // }).set({
      //   status: 'Accepted'
      // })
      this.$forceUpdate();

      this._clearConfirmBookingModal();
      // window.location = '/booking';

    },



    // decline booking 
    clickDeclineButton: function (bookingId) {
      console.log('Clicked the "confirm" button! bookingId: ', bookingId);
      this.declineBookingModalOpen = true;
      this.selectedBooking = _.find(this.datas, {
        id: bookingId
      });
      this.declineBookingFormData.code = this.selectedBooking.code;
      this.declineBookingFormData.date = this.selectedBooking.date;
      this.declineBookingFormData.time = this.selectedBooking.time;
      this.declineBookingFormData.remarks = this.selectedBooking.remarks;
      // this.declineBookingFormData.shopName = this.selectedBooking.shop.shopName;
    },

    _clearDeclineBookingModal: function () {
      this.selectedBooking = undefined;
      this.declineBookingModalOpen = false;
      this.declineBookingFormData = {};
    },

    closeDeclineBookingModal: function () {
      this._clearDeclineBookingModal();
    },

    handleParsingDeclineBookingForm: function () {
      return {
        id: this.selectedBooking.id
      };
    },

    submittedDeclineBookingForm: function (result) {
      console.log('ok, booking declined!', result.id);
      this.datas = _.reject(this.datas, {
        id: result.id
      })
      this.datas.push({
        id: result.id,
        date: this.declineBookingFormData.date,
        time: this.declineBookingFormData.time,
        status: 'Declined',
        code: this.declineBookingFormData.code,

      })
      // this.datas.update({
      //   id: result.id,

      // }).set({
      //   status: 'Declined'
      // });
      this.$forceUpdate();

      this._clearDeclineBookingModal();

      // this.declineBookingModalOpen = false;
      // this.selectedBooking = undefined;
      // window.location = '/booking';

    },

    // finish booking
    clickData: function (bookingId) {
      console.log('Clicked the "confirm" button! bookingId: ', bookingId);
      this.finishBookingModalOpen = true;
      this.selectedBooking = _.find(this.datas, {
        id: bookingId
      })
      this.finishBookingFormData.code = this.selectedBooking.code;
      this.finishBookingFormData.date = this.selectedBooking.date;
      this.finishBookingFormData.time = this.selectedBooking.time;
      this.finishBookingFormData.remarks = this.selectedBooking.remarks;
      // this.finishBookingFormData.shopName = this.selectedBooking.shop.shopName;
    },

    _clearfinishBookingModal: function () {
      this.selectedBooking = undefined;
      this.finishBookingModalOpen = false;
      this.finishBookingFormData = {};
    },

    closeFinishBookingModal: function () {
      this._clearfinishBookingModal();
    },

    submittedFinishBookingForm: function (result) {
      console.log('ok, booking completed!', result.id);
      this.datas = _.reject(this.datas, {
        id: result.id
      })
      this.datas.push({
        id: result.id,
        date: this.finishBookingFormData.date,
        time: this.finishBookingFormData.time,
        status: 'Completed',
        code: this.finishBookingFormData.code,

      })
      // _.push(this.datas, {
      //   status: 'Accepted'
      // });
      this.$forceUpdate();

      // this.finishBookingModalOpen = false;
      // this.selectedBooking = undefined;
      // window.location = '/booking';
      this._clearfinishBookingModal();
    },

    handleParsingFinishBookingForm: function () {
      return {
        id: this.selectedBooking.id
      };
    },

    // View booking 
    clickViewButton: function (bookingId) {
      console.log('Clicked the "confirm" button! bookingId: ', bookingId);
      this.confirmViewModalOpen = true;
      this.selectedBooking = _.find(this.datas, {
        id: bookingId
      });
      this.formData.code = this.selectedBooking.code;
      this.formData.date = this.selectedBooking.date;
      this.formData.time = this.selectedBooking.time;
      this.formData.remarks = this.selectedBooking.remarks;
      // this.formData.shop = this.selectedBooking.shop.shopName;

    },


    closeViewBookingModal: function () {
      this.selectedBooking = undefined;
      this.confirmViewModalOpen = false;
    },

    // review booking (user)
    clickReviewBooking: function (bookingId) {
      console.log('Clicked the "review" button! bookingId: ', bookingId);
      this.confirmReviewModalOpen = true;
      this.selectedBooking = _.find(this.books, {
        id: bookingId
      });
      this.formData.bookingId = this.selectedBooking.id;
      this.formData.shopId = this.selectedBooking.shop.id;
      this.formData.shopRatings = this.selectedBooking.shop.ratings;

    },

    handleParsingReviewBookingForm: function () {
      this.formErrors = {};

      var argins = this.formData;

      if (!argins.selected) {
        this.formErrors.selected = true;
      }

      return argins;


    },

    closeReviewBookingModal: function () {
      this.selectedBooking = undefined;
      this.confirmReviewModalOpen = false;
    },

    submittedReviewBookingForm: function (result) {
      console.log('ok, it worked!');
      // this.datas.update({
      //   id: result.id,

      // }).set({
      //   status: 'Declined'
      // });
      this.$forceUpdate();

      this.confirmReviewModalOpen = false;
      this.selectedBooking = undefined;
      window.location = '/booking';

    },



  }
});
