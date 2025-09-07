const schema = {
  typeDefs: `#graphql
    
    type Response {
      success: Boolean
      message: String 
    }

    type Query {
      hello: String
    }

    type Mutation {
      echo(message: String!): Response
    }
  `,

  resolvers: {
    Query: {
      hello: () => "Hello, world!",
    },
    Mutation: {
      echo: (_, { message }) => ({
        success: true,
        message,
      }),
    },
  },
  introspection: true,
  formatError: (err) => ({
    message: err.message,
    success: false,
  }),
};
module.exports = schema;
