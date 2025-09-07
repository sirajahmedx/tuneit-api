const mutations = `#graphql
    createCustomer(input: CreateCustomerInput!): CreateCustomerResponse
    updateUser(input: UpdateUserInput!): UpdateUserResponse
    signIn(input: SignInInput!): SignInResponse
`;
module.exports.mutations = mutations;
