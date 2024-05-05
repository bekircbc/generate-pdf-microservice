import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

// Örnek veri
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// GraphQL şeması
const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

// Resolver fonksiyonları
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }: { id: number }) => users.find(user => user.id === id),
  },
};

// Apollo Server oluşturma
const server = new ApolloServer({ typeDefs, resolvers });

// Express uygulaması oluşturma
const app = express();
server.applyMiddleware({ app });

// Sunucuyu başlatma
const PORT = process?.env.PORT || 3251;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
