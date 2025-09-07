const { User } = require("./user");
const schema = {
  typeDefs: `#graphql
     
    ${User.typedefs} 

    type Response {
      success: Boolean
      message: String 
    }

 type Query {
      hello: String
      ${User.queries} 
    }

    type Mutation {
      ${User.mutations}
    }
     
    `,

  resolvers: {
    Query: {
      hello: () => "Hello, world!",
      ...User.resolvers.Query,
    },
    Mutation: {
      ...User.resolvers.Mutation,
    },
  },
  introspection: true,
  formatError: (err) => ({
    message: err.message,
    success: false,
  }),
};

module.exports = schema;
