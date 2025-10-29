const { ApolloServer } = require("@apollo/server");
const dbConnect = require("./database");
const schema = require("./schema");

const createApolloGraphqlServer = async () => {
  const gqlServer = new ApolloServer(schema);
  await gqlServer.start();
  return gqlServer;
};

const context = {
  context: async ({ req, res }) => {
    await dbConnect();
    console.log("Context user:", req.user);
    // console.log("Context request:", req);
    // console.log("Context response:", res);

    return {
      req,
      res,
      user: req.user,
    };
  },
};

module.exports = { createApolloGraphqlServer, context };
