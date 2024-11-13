import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 4000;


connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath }`);
    });
};

startServer();