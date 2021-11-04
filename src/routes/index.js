const siteRouter=require('./site');
const countryRouter=require('./country');
const tourRouter=require('./tour')
const meRouter=require('./me');

const auth=require('../app/middleware/auth')

function route(app) {
  app.use('/destination',countryRouter);
  app.use('/tour',tourRouter);
  app.use('/me',auth.requireAuth,meRouter);
  app.use('/', siteRouter);
  }
  module.exports = route;
  