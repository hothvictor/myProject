/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  process.env.TZ = 'UTC+8'; //whatever timezone you want

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 3;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV === 'production' || sails.config.models.migrate === 'safe') {
      sails.log.warn('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "' + sails.config.environment + '" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return done();
    } //•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
      .tolerate('doesNotExist'); // (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v' + HARD_CODED_DATA_VERSION + ' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ ' + (new Date(lastRunBootstrapInfo.lastRunAt)) + ')');
      return done();
    } //•

    sails.log('Running v' + HARD_CODED_DATA_VERSION + ' bootstrap script...  (' + (lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v' + lastRunBootstrapInfo.lastRunVersion + ' @ ' + (new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer') + ')');
  } else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  } //∞

  // By convention, this is a good place to set up fake data during development.
  // await User.createEach([
  //   { emailAddress: 'admin@example.com', fullName: 'Ryan Dahl', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
  //   { emailAddress: 'him@example.com', fullName: 'him', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
  // ]);

  var ryanDahl = await User.create({
      emailAddress: 'admin@example.com',
      fullName: 'Ryan Dahl',
      phone: 62266226,
      isSuperAdmin: true,
      password: await sails.helpers.passwords.hashPassword('abc123'),
      shopOwner: 'Yes'
    },

  ).fetch();


  var him = await User.create({
    id: 1,
    emailAddress: 'him@example.com',
    fullName: 'him',
    phone: 95140904,
    isSuperAdmin: true,
    password: await sails.helpers.passwords.hashPassword('abc123'),
    shopOwner: 'Yes'
  }, ).fetch();

  await User.create({
    id: 2,
    emailAddress: 'shop@example.com',
    fullName: 'shop owner',
    phone: 21800000,
    isSuperAdmin: false,
    password: await sails.helpers.passwords.hashPassword('abc123'),
    shopOwner: 'Yes'
  }, ).fetch();

  await User.create({
    id: 3,
    emailAddress: 'user@example.com',
    fullName: 'shop user',
    phone: 91234567,
    isSuperAdmin: false,
    password: await sails.helpers.passwords.hashPassword('abc123'),
    shopOwner: 'No'
  }, ).fetch();

  // Add Ryan as one of him's friends
  await User.addToCollection(him.id, 'friends', ryanDahl.id);
  // Add Him as one of Ryan's friends
  await User.addToCollection(ryanDahl.id, 'friends', him.id);

  await News.create({
    newsName: "e-Clinic v1.1.0",
    newsDetail: "- SailsJS -VueJs - MongoDB ",
    date: "Tue Jun 11 2019 15:05:44 GMT+0800 (Hong Kong Standard Time)",
    imageSrc: "https://cdn.lynda.com/course/672254/672254-636934151583926532-16x9.jpg",
    newsSrc: "https://cdn.lynda.com/course/672254/672254-636934151583926532-16x9.jpg",
    owner: "1"
  }).fetch();

  await Event.create({
    eventName: "Babyganics 「認識家居致敏原及寶寶洗護技巧教室」健康講座",
    eventDetail: "日期：2019年4月30日 (星期二)時間：7:30pm – 9:30pm (7:15pm開始接受登記)地點：香港科學館演講廳對象：準爸媽/育有初生嬰兒之家長講者：資深註冊護士林小慧姑娘講座內容：認識家居致敏原及寶寶洗護技巧護理濕疹及皮膚問題嬰兒過敏症徵狀及風險初生嬰兒日常洗護技巧及示範另設問答環節",
    date: "2019-04-30",
    imageSrc: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F59449020%2F253604668432%2F1%2Foriginal.20190401-070338?w=800&auto=compress&rect=0%2C0%2C2160%2C1080&s=28afc0819c7bf1f6806a133c21d6111e",
    eventSrc: "https://www.eventbrite.com/e/babyganics-tickets-59518797325?aff=erelexpmlt",
    owner: "1"
  }).fetch();



  //create things
  // await Thing.createEach([
  //   {
  //     label: 'admin_him',
  //     owner: him.id
  //   },
  //   {
  //     label: 'admin_him1',
  //     owner: him.id
  //   },
  //   {
  //     label: 'admin_him2',
  //     owner: him.id
  //   },
  //   {
  //     label: 'ryan',
  //     owner: ryanDahl.id
  //   },
  //   {
  //     label: 'both',
  //     owner: ryanDahl.id
  //   }

  // ]);

  //create events
  // await Event.createEach([
  //   {
  //     label: '11111111111',
  //     owner: him.id
  //   },
  //   {
  //     label: '22222222222',
  //     owner: him.id
  //   },
  //   {
  //     label: '33333333333',
  //     owner: him.id
  //   },
  //   {
  //     label: 'ryan',
  //     owner: ryanDahl.id
  //   },
  //   {
  //     label: 'Dahl',
  //     owner: ryanDahl.id
  //   }

  // ]);

  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
      destination: bootstrapLastRunInfoPath,
      json: {
        lastRunVersion: HARD_CODED_DATA_VERSION,
        lastRunAt: Date.now()
      },
      force: true
    })
    .tolerate((err) => {
      sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `' + sails.config.appPath + '`.  Full error details: ' + err.stack + '\n\n(Proceeding anyway this time...)');
    });

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
