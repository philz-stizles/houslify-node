const info = require('./info');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const paths = require('./paths');

module.exports = {
  openapi: '3.0.3', // present supported openapi version
  info,
  servers,
  components,
  tags,
  paths,
  // security: [{ bearerAuth: [] }], this applies
};
