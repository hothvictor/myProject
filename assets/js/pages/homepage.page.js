parasails.registerPage('homepage', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    heroHeightSet: false,
    results: [],

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    this._setHeroHeight();
    this.getPost();

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickHeroButton: async function () {
      // Scroll to the 'get started' section:
      $('html, body').animate({
        scrollTop: this.$find('[role="scroll-destination"]').offset().top
      }, 500);
    },

    clickHeroButton2: async function () {
      // Scroll to the 'get started' section:
      $('html, body').animate({
        scrollTop: this.$find('[role="scroll-destination2"]').offset().top
      }, 500);
    },

    clickHeroButton3: async function () {
      // Scroll to the 'get started' section:
      $('html, body').animate({
        scrollTop: this.$find('[role="scroll-destination3"]').offset().top
      }, 500);
    },

    clickHeroButton4: async function () {
      // Scroll to the 'get started' section:
      $('html, body').animate({
        scrollTop: this.$find('[role="scroll-destination4"]').offset().top
      }, 500);
    },

    clickHeroButton5: async function () {
      // Scroll to the 'get started' section:
      $('html, body').animate({
        scrollTop: this.$find('[role="scroll-destination5"]').offset().top
      }, 500);
    },

    // Private methods not tied to a particular DOM event are prefixed with _
    _setHeroHeight: function () {
      var $hero = this.$find('[full-page-hero]');
      var headerHeight = $('#page-header').outerHeight();
      var heightToSet = $(window).height();
      heightToSet = Math.max(heightToSet, 500); //« ensure min height of 500px - header height
      heightToSet = Math.min(heightToSet, 1000); //« ensure max height of 1000px - header height
      $hero.css('min-height', heightToSet - headerHeight + 'px');
      this.heroHeightSet = true;
    },

    getPost() {
      axios.get('https://newsapi.org/v2/everything?q=health&apiKey=083be1c3a4914b3fbc8134118e730ddf')
        .then((response) => {
          this.results = response.data.articles;
          // console.log(results);
        }).catch(error => {
          console.log(error);
        });
    }

  }
});
