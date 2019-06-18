/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /welcome':            { action: 'dashboard/view-welcome' },


  // 'GET /news':               { view: 'pages/news' },
  // 'GET /news_article':       { view: 'pages/news_article' },

  // 'GET /safety':               { view: 'pages/safety' },
  // 'GET /events':               { view: 'pages/events' },
  // 'GET /bshop':               { view: 'pages/bshop' },


  'GET /faq':                { view:   'pages/faq' },
  'GET /legal/terms':        { view:   'pages/legal/terms' },
  'GET /legal/privacy':      { view:   'pages/legal/privacy' },
  'GET /contact':            { view:   'pages/contact' },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /shopsignup': { action: 'entrance/view-shop' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { view:   'pages/entrance/confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },

  // 'GET /news': { action: 'news/view-news' },

  // 'GET /article/news-article': { action: 'article/view-news-article' },

  // 'GET /test': { action: 'view-test' },

  'GET /user': { action: 'things/view-available-things' },

  // 'GET /admin/cbikeshop': { action: 'admin/view-cbikeshop' },
  // 'GET /admin/cevent': { action: 'admin/view-cevent' },
  // 'GET /admin/cnews': { action: 'admin/view-cnews' },

  'GET /info': { action: 'news/view-available-news' },
  // 'Get /news/article': { action: 'news/view-news-article' },
  // 'GET /news/create': { action: 'news/view-create-news' },
  // 'GET /news/modify/:id': { action: 'news/view-modify-news' },
  'GET /info/:id': { action: 'news/view-available-article' },
  'GET /events': { action: 'events/view-available-events' },
  'GET /events/unsubscribe': { action: 'events/view-unsubscribe' },

  'GET /shop': { action: 'shop/view-available-shop' },
  'GET /shop/:id': { action: 'shop/view-shop-details' },
  // 'GET /bikenews': { action: 'bikenews/view-bike-news' },
  'GET /booking': { action: 'booking/view-available-booking' },
  'GET /waiting-time': { action: 'booking/view-waiting-time' },

  'GET /admin': { action: 'admin/view-manage-data' },

  // test
  'GET /news': { action: 'test/view-news-health' },
  'GET /test/editor': { action: 'test/view-editor' },
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },
  //method /url: {route target}
  'DELETE  /api/v1/things/destroy-one-thing':          { action: 'things/destroy-one-thing' },
  'POST /api/v1/things/upload-thing':                {action: 'things/upload-thing'},
  'GET /api/v1/things/:id':                {action: 'things/download-photo'},

  //event
  'DELETE /api/v1/events/destroy-event': { action: 'events/destroy-event' },
  'POST /api/v1/events/upload-event': { action: 'events/upload-event' },
  'POST /api/v1/events/update-event': { action: 'events/update-event' },
  'POST /api/v1/events/unsubscribe-events': { action: 'events/unsubscribe-events' },
  'POST /api/v1/events/subscribe-events': { action: 'events/subscribe-events' },


  //news
  'DELETE /api/v1/news/destroy-news': { action: 'news/destroy-news' },
  'POST /api/v1/news/upload-news': { action: 'news/upload-news' },
  'POST /api/v1/news/update-news': { action: 'news/update-news' },
  'POST /api/v1/news/upload-article': { action: 'news/upload-article' },  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  'POST /api/v1/news/upload-comment': { action: 'news/upload-comment' },
  'DELETE /api/v1/news/destroy-comment': { action: 'news/destroy-comment' },

  //shop
  'DELETE /api/v1/shop/destroy-shop': { action: 'shop/destroy-shop' },
  'POST /api/v1/shop/upload-shop': { action: 'shop/upload-shop' },
  'POST /api/v1/shop/update-shop': { action: 'shop/update-shop' },
  'POST /api/v1/shop/new-booking': { action: 'shop/new-booking' },
  'GET /api/v1/shop/:id': { action: 'shop/shop-photo' },
  //admin
  'DELETE /api/v1/admin/destroy-user': { action: 'admin/destroy-user' },
  'POST /api/v1/admin/approve-shop': { action: 'admin/approve-shop' },
  'POST /api/v1/admin/reject-shop': { action: 'admin/reject-shop' },
  'DELETE /api/v1/admin/admin-destroy-shop': { action: 'admin/admin-destroy-shop' },

  // Booking
  'DELETE /api/v1/booking/destroy-booking': { action: 'booking/destroy-booking' },
  'POST /api/v1/booking/confirm-booking': { action: 'booking/confirm-booking' },
  'POST /api/v1/booking/decline-booking': { action: 'booking/decline-booking' },
  'POST /api/v1/booking/finish-booking': { action: 'booking/finish-booking' },
  'POST /api/v1/booking/review-booking': { action: 'booking/review-booking' },

  'POST /api/v1/booking/update-waiting-time': { action: 'booking/update-waiting-time' },
  'POST /api/v1/booking/reset-waiting-time': { action: 'booking/reset-waiting-time' },
  // test
  'POST /api/v1/test/retrieve-data': { action: 'test/retrieve-data' },
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  '/terms':                   '/legal/terms',
  //redirect /help to /contact
  '/help':                   '/contact',
  '/logout':                  '/api/v1/account/logout',

};
