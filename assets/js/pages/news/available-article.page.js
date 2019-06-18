parasails.registerPage('available-article', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    comments: [],
    confirmDeleteCommentModalOpen: false,
    selectedComment: undefined,

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

    // Success state when form has been submitted
    // cloudSuccess: false,
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

    // delete comment 
    clickDeleteComment: function (commentId) {
      console.log('clicked the "delete" button! commentId: ', commentId);
      this.confirmDeleteCommentModalOpen = true;
      this.selectedComment = _.find(this.comments, {
        id: commentId
      });
    },
    closeDeleteCommentModal: function () {
      this.selectedComment = undefined;
      this.confirmDeleteCommentModalOpen = false;
    },

    handleParsingDeleteCommentForm: function () {
      return {
        id: this.selectedComment.id
      };
    },

    submittedDeleteCommentForm: function () {
      console.log('ok, it worked!');
      _.remove(this.comments, {
        id: this.selectedComment.id
      });
      this.$forceUpdate();

      this.confirmDeleteCommentModalOpen = false;
      this.selectedComment = undefined;
    },


    // submit comment
    submittedForm: function (result) {
      this.comments.push({
        comment: this.formData.comment,
        id: result.id,
        owner: {
          id: this.me,
          fullName: this.me.fullName
        }
      });

      this.formData = {};
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
      console.log('Comment uploaded!');

    },

    handleParsingForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate full name:
      if (!argins.comment) {
        this.formErrors.comment = true;
      }
      return argins;
    },

    // sortBy: function (list) {
    //   return _.orderBy(list, 'name', 'asc');
    // },



  }
});
