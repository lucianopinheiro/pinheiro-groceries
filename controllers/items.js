const { connect } = require("../db");

async function initialItems(req, res) {
  const client = connect();

  const resQ = await client.query("SELECT * FROM public.items");
  const initialItems = await resQ.rows.map((row) => {
    return { name: row.name, quantity: row.quantity, icon: "ABCDEF", id: row.id };
  });
  res.json(initialItems);
}

async function createItem(req, res) {
  console.log(req.body);

  if (req.body.name) {
    const client = await connect();
    const sql = `INSERT INTO public.items (name, quantity) VALUES( '${req.body.name}',	1);`;
    await client.query(sql, (err, res) => {
      console.log("inserted");
      if (err) throw err;
    });

    await client.query(`COMMIT;`, (err, res) => {
      console.log("commited");
      if (err) throw err;
    });

    res.json({ status: "Ok", message: "Item Created", name: req.body.name });
  } else {
    res.json({ status: "Error", message: "Item NOT Created", name: req.body.name });
  }
}

async function editItem(req, res) {
  const client = await connect();
  const sql = `UPDATE public.items SET quantity = ${req.params.quantity} WHERE name = '${req.params.item}';`;
  await client.query(sql, (err, res) => {
    console.log("updated");
    if (err) throw err;
  });

  await client.query(`COMMIT;`, (err, res) => {
    console.log("commited");
    if (err) throw err;
  });

  //res.send({ name: req.name, quantity: req.quantity });
  res.json({ item: req.params.item, quantity: req.params.quantity });
}

module.exports = { initialItems, createItem, editItem };
