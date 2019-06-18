parasails.registerPage('shop-details', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    selected: '',
    bookings: [],
    shops: [],
    countbookings: [],
    shopId: Int16Array,
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

    // time: Date(),
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
    // submit booking
    submittedForm: function (result) {
      // this.Booking.push({
      //   date: this.formData.date,
      //   time: this.formData.time,
      //   service: this.formData.service,
      //   remarks: this.formData.remarks,
      //   id: result.id,
      //   owner: {
      //     id: this.me,
      //     fullName: this.me.fullName
      //   }
      // });

      this.formData = {};
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
      console.log('Booking uploaded!');
      window.location = '/booking/';

    },

    handleParsingForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate
      if (!argins.time) {
        this.formErrors.time = true;
      }

      if (!argins.date) {
        this.formErrors.date = true;

      }

      // if (!argins.session1) {
      //   this.formErrors.session1 = true;
      // }

      // if (!argins.session2) {
      //   this.formErrors.session2 = true;
      // }

      if (!argins.service) {
        this.formErrors.comment = true;
      }

      if (!argins.remarks) {
        this.formErrors.remarks = true;
      }

      return argins;
    },

    // approve
    handleParsingApproveForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate
      if (!argins.id) {
        this.formErrors.id = true;
      }
      return argins;

    },


    submittedApproveShopForm: function () {
      console.log('ok, it worked!');
      // _.push(this.datas, {
      //   status: 'Accepted'
      // });
      this.$forceUpdate();

      this.approveShopModalOpen = false;
      this.formData = {};
      this.formErrors = {};
      this.cloudError = '';

      window.location = '/admin';
    },

    // reject
    handleParsingRejectForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate
      if (!argins.id) {
        this.formErrors.id = true;
      }
      return argins;

    },


    submittedRejectShopForm: function () {
      console.log('ok, it worked!');
      // _.push(this.datas, {
      //   status: 'Accepted'
      // });
      this.$forceUpdate();

      this.approveShopModalOpen = false;
      this.formData = {};
      this.formErrors = {};
      this.cloudError = '';

      window.location = '/admin';
    },


    totalBookings: function (id) {
      this.countbookings = _.filter(this.bookings, {
        shop: id
      })
      if (this.countbookings.length > 0) {
        return this.countbookings.length
      } else {
        return 0
      }
    },

    getId: function (id) {

      return id
    }

    // countStar: function (num, id) {
    //   this.countbookings = _.filter(this.bookings, {
    //     ratings: num,
    //     shop: id
    //   })
    //   if (this.countbookings.length > 0) {
    //     return this.countbookings.length
    //   } else {
    //     return 0
    //   }

    // },
    // star5Percent: function () {
    //   this.countbookings = this.bookings.filter(function (booking) {
    //     booking.ratings == 5
    //   })
    //   return this.bookings.length / this.countbookings.length * 100

    // },

  },

  computed: {

    totalBooking: function () {
      return this.bookings.filter(function (booking) {
        return parseInt(booking.shop) == parseInt(this.shopId)
      })
    },

    countStar5: function () {
      return this.bookings.filter(function (booking) {
        return booking.ratings == 5
      })
    },

    countStar4: function () {
      return this.bookings.filter(function (booking) {
        return booking.ratings == 4
      })
    },

    countStar3: function () {
      return this.bookings.filter(function (booking) {
        return booking.ratings == 3
      })
    },

    countStar2: function () {
      return this.bookings.filter(function (booking) {
        return booking.ratings == 2
      })
    },

    countStar1: function () {
      return this.bookings.filter(function (booking) {
        return booking.ratings == 1
      })
    },




  }
});
