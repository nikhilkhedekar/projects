const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require('@apollo/server/standalone');

//Apollo typeDefs and resolvers
const { typeDefs } = require("../typeDefs/TypeDefs");
const { resolvers } = require('../resolvers/resolvers');

exports.apolloServer = async () => {
    try {
        const port = process.env.APOLLO_PORT || 4000;
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        const { url } = await startStandaloneServer(server, { listen: { port: port } });
        console.log(`🚀 Server listening at: ${url}`);
    } catch (error) {
        console.log("error", error);
    }
}