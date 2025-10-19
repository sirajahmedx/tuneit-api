const { User } = require("./user");
const { Service } = require("./service");
const schema = {
  typeDefs: `#graphql

    ${User.typedefs}
    ${Service.typedefs}

    type Response {
      success: Boolean!
      message: String!
    }

    type Query {
      hello: String
      ${User.queries} 
      ${Service.queries}
    }

    type Mutation {
      ${User.mutations}
      ${Service.mutations}
    }
     
    `,

  resolvers: {
    Query: {
      hello: () => "Hello, world!",
      ...User.resolvers.queries,
    },
    Mutation: {
      ...User.resolvers.mutations,
      ...Service.resolvers.mutations,
    },
  },
  introspection: true,
  formatError: (err) => ({
    message: err.message,
    success: false,
  }),
};

module.exports = schema;
