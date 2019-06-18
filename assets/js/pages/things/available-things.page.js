parasails.registerPage('available-things', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    things: [],
    confirmDeleteThingModalOpen: false,
    selectedThing: undefined,

    uploadThingModalOpen: false,

    updateThingModalOpen: false,

    //form data **************
    uploadFormData: {
      label: '',
      photo: undefined,
    },

    updateFormData: {
      label: '',
      photo: undefined,
    },

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

    // clickThing: async function (thingId) {
    //   console.log('clicked a thing #' + thingId);
    //   await Cloud.destroyOneThing.with({id: thingId});_.remove(this.things, {id: thingId});
    //   this.$forceUpdate();
    // },

    clickDeleteThing: function (thingId) {
      console.log('clicked the "delete" button! thingId: ', thingId);
      this.confirmDeleteThingModalOpen = true;
      this.selectedThing = _.find(this.things, {
        id: thingId
      });
    },

    closeDeleteThingModal: function () {
      this.selectedThing = undefined;
      this.confirmDeleteThingModalOpen = false;
    },

    handleParsingDeleteThingForm: function () {
      return {
        id: this.selectedThing.id
      };
    },

    submittedDeleteThingForm: function () {
      console.log('ok, it worked!');
      _.remove(this.things, {
        id: this.selectedThing.id
      });
      this.$forceUpdate();

      this.confirmDeleteThingModalOpen = false;
      this.selectedThing = undefined;
    },

    clickAddButton: function () {
      this.uploadThingModalOpen = true;
    },

    _clearUploadThingModal: function () {
      //close modal
      this.uploadThingModalOpen = false;
      //reset form data**********************
      this.uploadFormData = {
        label: '',
        photo: undefined,
      };
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUploadThingModal: function () {
      this._clearUploadThingModal();
    },

    handleParsingUploadThingForm: function () {
      this.formErrors = {};

      var argins = this.uploadFormData;

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      // Validate label:
      if (!argins.label) {
        this.formErrors.label = true;
      }

      // Validate photo:
      if (!argins.photo) {
        this.formErrors.photo = true;
      }
      return argins;
    },

    submittedUploadThingForm: function (result) {

      this.things.push({
        label: this.uploadFormData.label,
        id: result.id,
        owner: {
          id: this.me,
          fullName: this.me.fullName
        }
      })
      console.log('ok, it worked!');
      this.$forceUpdate();


      this._clearUploadThingModal();

    },

    // changeFileInput: function(files){
    //   var selectedFile = files[0];
    //   if(!selectedFile){
    //     this.uploadFormData.photo = undefined;
    //     return;
    //   }

    //   this.uploadFormData.photo = selectedFile; 

    // },

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


    //update modal
    // clickUpdateButton: function (thingId) {
    //   this.updateThingModalOpen = true;
    //   this.updateThing = _.find(this.things, {
    //     id: thingId
    //   });

    //   this.updateFormData.label = this.updateThing.label;
    //   console.log('clicked the "update" button! thingId: ', thingId, this.updateFormData.label, updateFormData.photo);


    // },

    // _clearUpdateThingModal: function () {
    //   //close modal
    //   this.updateThingModalOpen = false;
    //   //reset form data**********************
    //   this.updateFormData = {
    //     label: '',
    //     photo: undefined,
    //   };
    //   //clear error states
    //   this.formErrors = {};
    //   this.cloudError = '';
    // },

    // closeUpdateThingModal: function () {
    //   this._clearUpdateThingModal();
    // },

    // handleParsingUpdateThingForm: function () {
    //   this.formErrors = {};

    //   var argins = this.updateFormData;

    //   if (Object.keys(this.formErrors).length > 0) {
    //     return;
    //   }

    //   // Validate label:
    //   if (!argins.label) {
    //     this.formErrors.label = true;
    //   }

    //   // Validate photo:
    //   if (!argins.photo) {
    //     this.formErrors.photo = true;
    //   }
    //   return argins;
    // },

    // submittedUpdateThingForm: function (result) {

    //   this.things.push({
    //     label: this.updateFormData.label,
    //     id: result.id,
    //     owner: {
    //       id: this.me,
    //       fullName: this.me.fullName
    //     }
    //   })
    //   console.log('ok, it worked!');
    //   this.$forceUpdate();


    //   this._clearUpdateThingModal();

    // },
  }
});
