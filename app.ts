import { config } from "dotenv";
config();
import express from "express";
import type { Express } from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloGraphqlServer, context } from "./modules/server";
import { dbConnect } from "./modules/db";

const func = async () => {
  const app: Express = express();
  const PORT = process.env.PORT || 8080;
  await dbConnect();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        return callback(null, true);
      },
      credentials: true,
    })
  );

  const server = await createApolloGraphqlServer();
  app.use("/graphql", expressMiddleware(server, { context }) as any);
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

func();
