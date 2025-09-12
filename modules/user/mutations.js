const mutations = `#graphql
    createCustomer(input: CreateCustomerInput!): CreateCustomerResponse
    updateCustomer(input: UpdateCustomerInput!): UpdateCustomerResponse
    createMechanic(input: CreateMechanicInput!): CreateMechanicResponse
    updateMechanic(input: UpdateMechanicInput!): UpdateMechanicResponse
    signIn(input: SignInInput!): SignInResponse
    googleAuth(input: GoogleAuthInput!): AuthResponse!
`;
module.exports.mutations = mutations;
