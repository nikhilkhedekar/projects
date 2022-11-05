const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require('@apollo/server/standalone');

//Apollo typeDefs and resolvers
const { typeDefs } = require("../typeDefs/TypeDefs");
const { resolvers } = require('../resolvers/resolvers');

exports.apolloServer = async () => {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
        console.log(`🚀 Server listening at: ${url}`);
    } catch (error) {
        console.log("error", error);
    }
}