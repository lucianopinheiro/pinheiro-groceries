const envs = require("./envs.js");

const { Client } = require("pg");

const client = new Client({
  connectionString: envs.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query("SELECT table_schema,table_name FROM information_schema.tables;", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

//response.rows.map();
// client.query(
//   `CREATE TABLE public.items
//    (id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,	name varchar NOT NULL,	quantity int4 NOT NULL DEFAULT 0);`,
//   (err, res) => {
//     if (err) throw err;
//   }
// );
