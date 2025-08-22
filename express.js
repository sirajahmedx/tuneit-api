const dotenv = require("dotenv").config();
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const {
  createApolloGraphqlServer,
  context,
} = require("./backend/graphqlServer");
const cors = require("cors");

const init = async () => {
  const app = express();
  const PORT = process.env.PORT || 10000;
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

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), context)
  );
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

init();
