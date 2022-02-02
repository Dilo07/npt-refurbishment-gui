const packageObj = require('../../package.json');
const version = packageObj.version;

export const environment = {
  production: true,
  security: {
    type: 'noAuth',
    configFile: 'assets/config/prod/config-app.json?version=' + version
  },
  header: {
    img: 'assets/images/logo_logistic.png',
    title: 'Refurbishment'
  },
  footer: {
    year: 'v. ' + version + ' 2021',
    title: 'Powered by Movyon',
    link: 'https://www.movyon.com/'
  }
};
