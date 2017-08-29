var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var pageTitle = 'PIoT Dashboard';
var fetchCollection = function(Model) {
  mongoose.model(Model).find(function(err, items, count) {
    if (err) { res.send(err); }
    return items;
  });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: pageTitle,
    message: 'Hello!',
    users: fetchCollection('User'),
    devices: fetchCollection('Device')
  };

  var vue = {
    head: {
      title: pageTitle,
      meta: [{
        property: 'og:title',
        content: pageTitle
      },
      // {
      //   name: 'twitter:title',
      //   content: pageTitle
      // },
      {
        script: 'https://unpkg.com/vue@2.4.2/dist/vue.js'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      }]
      // structuredData: {
      //   '@context': 'http://schema.org',
      //   '@type': 'Organization',
      //   'url': 'http://www.your-company-site.com'
      // }
    }
  };

  res.renderVue('index', data, vue);
});

module.exports = router;
