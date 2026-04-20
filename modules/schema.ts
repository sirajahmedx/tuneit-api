import {User} from "./user";
import {Service} from "./service";
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
  formatError: (err:any) => ({
    message: err.message,
    success: false,
  }),
};

export default schema;
