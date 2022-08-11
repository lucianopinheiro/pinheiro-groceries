import ListItems from "./ListItems";
import "./Body.css";
import { useState, useEffect } from "react";

function Body() {
  let initialItems = [];

  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/items/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data.sort((a, b) => (a.name > b.name ? 1 : -1));
        setItems(data);
        setFilteredItems(data);
      });
  }, []);

  const handleItems = (item, operation) => {
    if (operation === "add") {
      item.quantity += 1;
    } else if (operation === "del") {
      if (item.quantity === 1) {
        item.selected = undefined;
      }
      item.quantity -= 1;
    } else if (operation === "sel") {
      item.selected = item.selected === undefined ? "selected" : undefined;
    }
    const newList = [...items.filter((i) => i.id !== item.id), item].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });

    setItems(newList);
    setFilteredItems(newList);
  };

  const changeFilter = (e) => {
    const newItems = items.filter((item) => {
      return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    setFilteredItems(newItems);
    // return
  };

  const addItem = (e) => {
    const id = items.reduce((value, item) => {
      return item.id >= value ? item.id + 1 : value;
    }, 0);
    const newItem = { name: e.target.previousSibling.value, quantity: 1, icon: "ABC", id: id };
    //console.log(e.target.previousSibling.value);
    handleItems(newItem, "new");
    e.target.previousSibling.value = "";
  };

  return (
    <main>
      <input name="inputFilter" id="inputFilter" onChange={changeFilter} />
      <button disabled={filteredItems.length} onClick={addItem}>
        Novo item
      </button>
      <h2>Pendentes</h2>
      <button> shop &gt;&gt; </button>
      <ListItems items={filteredItems.filter((item) => item.quantity > 0)} handleItems={handleItems} />
      <h2>Estoque</h2>
      <ListItems items={filteredItems.filter((item) => item.quantity === 0)} handleItems={handleItems} />
    </main>
  );
}

export default Body;
