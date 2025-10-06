const { resolvers } = require("./resolvers");
const { typedefs } = require("./typedefs");
const { model } = require("./model");
const { service } = require("./service");
const { mutations } = require("./mutations");
const { queries } = require("./queries");

module.exports.Service = {
  resolvers,
  typedefs,
  model,
  service,
  mutations,
  queries,
};
