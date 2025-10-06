const mutations = `#graphql

  createService(input: ServiceInput!): CreateServiceResponse

  updateService(id: String!, input: ServiceInput!): ServiceResponse

  deleteServiceById(id: String!): Response

`;
module.exports.mutations = mutations;
