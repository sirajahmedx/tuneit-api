import { ApolloServer } from "@apollo/server";
import  schema  from "./schema";
import { dbConnect } from "./db";


const createApolloGraphqlServer = async () => {
  const gqlServer = new ApolloServer(schema);
  await gqlServer.start();
  return gqlServer;
};

const context = async ({ req, res }: { req: any; res: any }) => {
  await dbConnect();
  // console.log("Context user:", req.user);
  // console.log("Context request:", req);
  // console.log("Context response:", res);

  return {
    req,
    res,
    user: req.user,
  };
};

export { createApolloGraphqlServer, context };
