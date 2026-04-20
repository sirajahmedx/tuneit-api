import { resolvers } from "./resolvers";
import { typedefs } from "./typedefs";
import { model } from "./model";
import { service } from "./service";
import { mutations } from "./mutations";
import { queries } from "./queries";

export const User = {
  resolvers,
  typedefs,
  model,
  service,
  mutations,
  queries,
};
