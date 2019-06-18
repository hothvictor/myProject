parasails.registerPage('available-news', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    newss: [],
    confirmDeleteNewsModalOpen: false,
    selectedNews: undefined,
    uploadNewsModalOpen: false,
    updateNewsModalOpen: false,

    //form data **************
    uploadFormData: {},

    updateFormData: {},


    //Syncing / loading state
    syncing: false,

    //validation errors (not open two form at same time)
    formErrors: {},

    //server error state
    cloudError: '',

    search: ''
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

    clickDeleteNews: function (newsId) {
      console.log('clicked the "delete" button! newsId: ', newsId);
      this.confirmDeleteNewsModalOpen = true;
      this.selectedNews = _.find(this.newss, {
        id: newsId
      });
    },
    closeDeleteNewsModal: function () {
      this.selectedNews = undefined;
      this.confirmDeleteNewsModalOpen = false;
    },

    handleParsingDeleteNewsForm: function () {
      return {
        id: this.selectedNews.id
      };
    },

    submittedDeleteNewsForm: function () {
      console.log('ok, it worked!');
      _.remove(this.newss, {
        id: this.selectedNews.id
      });
      _.remove(this.filterNews, {
        id: this.selectedNews.id
      });
      this.$forceUpdate();

      this.confirmDeleteNewsModalOpen = false;
      this.selectedNews = undefined;
    },

    //upload
    clickAddButton: function () {
      this.uploadNewsModalOpen = true;

    },


    _clearUploadNewsModal: function () {
      //close modal
      this.uploadNewsModalOpen = false;
      //reset form data**********************
      this.uploadFormData = {};
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUploadNewsModal: function () {
      this._clearUploadNewsModal();
    },

    handleParsingUploadNewsForm: function () {
      this.formErrors = {};

      var argins = this.uploadFormData;

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



      // Validate photo:
      // if (!argins.photo) {
      //   this.formErrors.photo = true;
      // }
      return argins;
    },

    submittedUploadNewsForm: function (result) {

      this.newss.push({
        newsName: this.uploadFormData.newsName,
        newsDetail: this.uploadFormData.newsDetail,
        // date: this.uploadFormData.date,
        imageSrc: this.uploadFormData.imageSrc,
        newsSrc: this.uploadFormData.newsSrc,
        id: result.id,
        owner: {
          id: this.me,
          fullName: this.me.fullName
        }
      })
      console.log('News uploaded!', result.id);
      // this.$forceUpdate();


      this._clearUploadNewsModal();

    },


    //update modal
    clickUpdateButton: function (newsId) {
      this.updateNewsModalOpen = true;
      this.updateNews = _.find(this.newss, {
        id: newsId
      });
      //news data
      this.updateFormData.id = this.updateNews.id;
      this.updateFormData.newsName = this.updateNews.newsName;
      this.updateFormData.newsDetail = this.updateNews.newsDetail;
      // this.updateFormData.date = this.updateNews.date;
      this.updateFormData.imageSrc = this.updateNews.imageSrc;
      this.updateFormData.newsSrc = this.updateNews.newsSrc;
      console.log('clicked the "update" button! newsId: ', newsId);


    },

    _clearUpdateNewsModal: function () {
      //close modal
      this.updateNewsModalOpen = false;
      //reset form data**********************
      this.updateFormData = {};
      //clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUpdateNewsModal: function () {
      this._clearUpdateNewsModal();
    },

    handleParsingUpdateNewsForm: function () {
      this.formErrors = {};

      var argins = this.updateFormData;

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      // Validate label:
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

      // if (!argins.newsSrc) {
      //   this.formErrors.newsSrc = true;
      // }
      return argins;
    },

    submittedUpdateNewsForm: function (result) {

      this.newss = _.reject(this.newss, {
        id: result.id
      })
      this.newss.push({
        id: result.id,
        newsName: this.updateFormData.newsName,
        newsDetail: this.updateFormData.newsDetail,
        imageSrc: this.updateFormData.imageSrc,
        newsSrc: this.updateFormData.newsSrc,
      })
      console.log('News updated!');
      this._clearUpdateNewsModal();
      // window.location = '/news';

    },



    searchNews: function () {

      return this.newss.filter(news => {
        return news.newsName.includes(this.search);
      });
      // var matcher = new RegExp(this.search, 'i')
      // return this.newss.filter(function (news) {
      //   return matcher.test(news.newsName)
      // })
    },



  },

  computed: {
    filterNews: function () {
      // return this.newss.filter(function (news) {
      // return news % 2 === 0
      //   return news.newsName.match(this.search);
      var matcher = new RegExp(this.search, 'i')
      return this.newss.filter(function (news) {
        return matcher.test(news.newsName)
      })
    },
  }



});
