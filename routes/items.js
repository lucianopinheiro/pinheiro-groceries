const initialItems = function (req, res) {
  const initialItems = [
    { name: "Carne", quantity: 1, icon: "ABC", id: 1 },
    { name: "Pão", quantity: 1, icon: "ABC", id: 2 },
    { name: "Ovo", quantity: 1, icon: "ABC", id: 3 },
    { name: "Macarrão", quantity: 0, icon: "ABC", id: 4 },
    { name: "Peixe", quantity: 0, icon: "ABC", id: 5 },
    { name: "Melão", quantity: 1, icon: "ABC", id: 6 },
    { name: "Chocolate", quantity: 2, icon: "ABC", id: 7 },
    { name: "Manteiga", quantity: 1, icon: "ABC", id: 8 },
  ].sort((a, b) => (a.name > b.name ? 1 : -1));

  res.json(initialItems);
};

const createItem = function (req, res) {
  console.log(req);
  res.json(req.params);
  //res.json({ status: "Ok", message: "Item Created", req: req.params.name, msg: "Luciano" });
};

const editItem = function (req, res) {
  //res.send({ name: req.name, quantity: req.quantity });
  res.json({ item: req.params.item, quantity: req.params.quantity });
};

module.exports = { initialItems, createItem, editItem };
