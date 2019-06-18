parasails.registerPage('available-events', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    events: [],
    confirmDeleteEventModalOpen: false,
    selectedEvent: undefined,
    uploadEventModalOpen: false,
    updateEventModalOpen: false,

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

    clickDeleteEvent: function (eventId) {
      console.log('clicked the "delete" button! eventId: ', eventId);
      this.confirmDeleteEventModalOpen = true;
      this.selectedEvent = _.find(this.events, {
        id: eventId
      });
    },
    closeDeleteEventModal: function () {
      this.selectedEvent = undefined;
      this.confirmDeleteEventModalOpen = false;
    },

    handleParsingDeleteEventForm: function () {
      return {
        id: this.selectedEvent.id
      };
    },

    submittedDeleteEventForm: function () {
      console.log('ok, it worked!');
      _.remove(this.events, {
        id: this.selectedEvent.id
      });
      _.remove(this.filterEvent, {
        id: this.selectedEvent.id
      });
      this.$forceUpdate();

      this.confirmDeleteEventModalOpen = false;
      this.selectedEvent = undefined;
    },

    //upload
    clickAddButton: function () {
      this.uploadEventModalOpen = true;
    },

    _clearUploadEventModal: function () {
      //close modal
      this.uploadEventModalOpen = false;
      //reset form data**********************
      this.uploadFormData = {};
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUploadEventModal: function () {
      this._clearUploadEventModal();
    },

    handleParsingUploadEventForm: function () {
      this.formErrors = {};

      var argins = this.uploadFormData;

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      // Validation
      if (!argins.eventName) {
        this.formErrors.eventName = true;
      }

      if (!argins.eventDetail) {
        this.formErrors.eventDetail = true;
      }

      if (!argins.date) {
        this.formErrors.date = true;
      }

      if (!argins.imageSrc) {
        this.formErrors.imageSrc = true;
      }

      if (!argins.eventSrc) {
        this.formErrors.eventSrc = true;
      }



      // Validate photo:
      // if (!argins.photo) {
      //   this.formErrors.photo = true;
      // }
      return argins;
    },

    submittedUploadEventForm: function (result) {

      this.events.push({
        eventName: this.uploadFormData.eventName,
        eventDetail: this.uploadFormData.eventDetail,
        date: this.uploadFormData.date,
        imageSrc: this.uploadFormData.imageSrc,
        eventSrc: this.uploadFormData.eventSrc,
        id: result.id,
        owner: {
          id: this.me,
          fullName: this.me.fullName
        }
      })
      console.log('Event uploaded!');
      // this.$forceUpdate();


      this._clearUploadEventModal();

    },


    //update modal
    clickUpdateButton: function (eventId) {
      this.updateEventModalOpen = true;
      this.updateEvent = _.find(this.events, {
        id: eventId
      });
      //event data
      this.updateFormData.id = this.updateEvent.id;
      this.updateFormData.eventName = this.updateEvent.eventName;
      this.updateFormData.eventDetail = this.updateEvent.eventDetail;
      this.updateFormData.date = this.updateEvent.date;
      this.updateFormData.imageSrc = this.updateEvent.imageSrc;
      this.updateFormData.eventSrc = this.updateEvent.eventSrc;
      console.log('clicked the "update" button! eventId: ', eventId);


    },

    _clearUpdateEventModal: function () {
      //close modal
      this.updateEventModalOpen = false;
      //reset form data**********************
      this.updateFormData = {};
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUpdateEventModal: function () {
      this._clearUpdateEventModal();
    },

    handleParsingUpdateEventForm: function () {
      this.formErrors = {};

      var argins = this.updateFormData;

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      // Validate label:
      if (!argins.eventName) {
        this.formErrors.eventName = true;
      }

      if (!argins.eventDetail) {
        this.formErrors.eventDetail = true;
      }

      if (!argins.date) {
        this.formErrors.date = true;
      }

      if (!argins.imageSrc) {
        this.formErrors.imageSrc = true;
      }

      if (!argins.eventSrc) {
        this.formErrors.eventSrc = true;
      }
      return argins;
    },

    submittedUpdateEventForm: function (result) {

      this.events = _.reject(this.events, {
        id: result.id
      })
      this.events.push({
        id: result.id,
        eventName: this.updateFormData.eventName,
        eventDetail: this.updateFormData.eventDetail,
        date: this.updateFormData.date,
        imageSrc: this.updateFormData.imageSrc,
        eventSrc: this.updateFormData.eventSrc,
      })


      // this.events.find({
      //   id: result.id
      // }).set({
      //   eventName: this.updateFormData.eventName,
      //   eventDetail: this.updateFormData.eventDetail,
      //   date: this.updateFormData.date,
      //   imageSrc: this.updateFormData.imageSrc,
      //   eventSrc: this.updateFormData.eventSrc,

      // })


      // _.set(_.find(this.filterEvent, {
      //   id: result.id
      // }), {
      //   eventName: this.updateFormData.eventName,
      //   eventDetail: this.updateFormData.eventDetail,
      //   date: this.updateFormData.date,
      //   imageSrc: this.updateFormData.imageSrc,
      //   eventSrc: this.updateFormData.eventSrc,
      // })

      // _.find(this.events, {
      //   id: result.id
      // }, _.set({
      //   eventName: this.updateFormData.eventName,
      //   eventDetail: this.updateFormData.eventDetail,
      //   date: this.updateFormData.date,
      //   imageSrc: this.updateFormData.imageSrc,
      //   eventSrc: this.updateFormData.eventSrc,
      // }))

      // _.find(this.filterEvent, {
      //   id: result.id
      // }, _.set({
      //   eventName: this.updateFormData.eventName,
      //   eventDetail: this.updateFormData.eventDetail,
      //   date: this.updateFormData.date,
      //   imageSrc: this.updateFormData.imageSrc,
      //   eventSrc: this.updateFormData.eventSrc,
      // }))

      // _.set(_.find(this.events, {
      //   id: result.id
      // }), {
      //   eventName: this.updateFormData.eventName,
      //   eventDetail: this.updateFormData.eventDetail,
      //   date: this.updateFormData.date,
      //   imageSrc: this.updateFormData.imageSrc,
      //   eventSrc: this.updateFormData.eventSrc,
      // })
      // this.filterEvent.find({
      //   id: result.id
      // }).set({
      //   eventName: this.updateFormData.eventName,
      //   eventDetail: this.updateFormData.eventDetail,
      //   date: this.updateFormData.date,
      //   imageSrc: this.updateFormData.imageSrc,
      //   eventSrc: this.updateFormData.eventSrc,

      // })


      this.$forceUpdate();

      console.log('Event updated!', result.id);
      this._clearUpdateEventModal();
      // window.location = '/events';

    },


  },
  computed: {
    filterEvent: function () {
      var matcher = new RegExp(this.search, 'i')
      return this.events.filter(function (event) {
        return matcher.test(event.eventName)
      })
    },
  }
});
