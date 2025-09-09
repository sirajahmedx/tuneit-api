const mutations = `#graphql
    createCustomer(input: CreateCustomerInput!): CreateCustomerResponse
    updateUser(input: UpdateUserInput!): UpdateUserResponse
    signIn(input: SignInInput!): SignInResponse
    googleAuth(input: GoogleAuthInput!): AuthResponse!
`;
module.exports.mutations = mutations;
