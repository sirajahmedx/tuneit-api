const mutations = `#graphql
    createCustomer(input: CreateCustomerInput!): CreateCustomerResponse
    updateCustomer(input: UpdateCustomerInput!): UpdateCustomerResponse
`;
module.exports.mutations = mutations;
