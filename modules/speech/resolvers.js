// const { transcribe } = require("./service");
// const { GraphQLUpload } = require("graphql-upload"); // Add to package.json if needed

// const resolvers = {
//   Upload: GraphQLUpload,
//   Mutation: {
//     transcribeAudio: async (_, { audio }) => {
//       const { createReadStream } = await audio;
//       const stream = createReadStream();
//       const chunks = [];
//       for await (const chunk of stream) {
//         chunks.push(chunk);
//       }
//       const buffer = Buffer.concat(chunks);
//       return await transcribe(buffer);
//     },
//   },
// };

// module.exports = resolvers;
