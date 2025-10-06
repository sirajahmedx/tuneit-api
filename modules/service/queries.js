const queries = `#graphql 

   getAllServices(
    page: Int,
    limit: Int,
    sortField: String,
    sortOrder: String,
    filters: ServiceFilterInput
  ): GetAllServicesResponse

   getServiceById(id: String!): ServiceResponse

`;

module.exports.queries = queries;
