const { ApolloServer, gql } = require("apollo-server");
const { Pool } = require("pg");

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "mare",
    port: 5432,
});

pool.query(
    `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
`,
).catch((err) => console.error("Error creating table", err));

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users(name: String, email: String): [User!]!
    }

    type Mutation {
        addUser(name: String!, email: String!): User!
        deleteUser(id: ID!): User!
    }
`;

const resolvers = {
    Query: {
        users: async (_, { name, email }) => {
            let query = "SELECT * FROM users WHERE 1=1";
            const values = [];

            if (name) {
                query += ` AND name ILIKE $${values.length + 1}`;
                values.push(`%${name}%`);
            }

            if (email) {
                query += ` AND email ILIKE $${values.length + 1}`;
                values.push(`%${email}%`);
            }

            const result = await pool.query(query, values);
            return result.rows;
        },
    },
    Mutation: {
        addUser: async (_, { name, email }) => {
            if (!validateEmail(email)) {
                throw new Error("Invalid email format");
            }

            const result = await pool.query(
                "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
                [name, email],
            );
            return result.rows[0];
        },
        deleteUser: async (_, { id }) => {
            const result = await pool.query(
                "DELETE FROM users WHERE id = $1 RETURNING *",
                [id],
            );

            if (result.rows.length === 0) {
                throw new Error("User not found");
            }

            return result.rows[0];
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
