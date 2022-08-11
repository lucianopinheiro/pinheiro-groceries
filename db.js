require("dotenv").config();
const { Client } = require("pg");

function connect() {
  if (global.connection) return global.connection;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  global.connection = client;
  client.connect();

  return client;
}
module.exports = { connect };
