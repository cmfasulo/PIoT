// Example config file: to use, rename to config.js and substitute appropriate values below.

var config = {
  address: '{{serverHost}}',
  port: 1234,
  dbName: '{{dbName}}',
  dbHost: '{{dbHost}}',
  dbPort: 12345,
  secret: '{{Something really unique and possibly profound and life-changing here}}',
  rooms: ['{{room-1}}', '{{room-2}}', '{{room-3}}', '{{room-4}}', '{{etc}']
};

module.exports = config;
