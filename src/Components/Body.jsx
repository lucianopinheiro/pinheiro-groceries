import ListItems from "./ListItems";
import "./Body.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Body() {
  let initialItems = [];
  const URL = "https://pinheiro-groceries.herokuapp.com";

  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);

  useEffect(() => {
    fetch(URL + "/api/v1/items/")
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
      //api/v1/items/:item/:quantity
      item.quantity += 1;
      axios.patch(URL + `/api/v1/items/${item.name}/${item.quantity}`);
    } else if (operation === "del") {
      if (item.quantity === 1) {
        item.selected = undefined;
      }
      item.quantity -= 1;
      axios.patch(URL + `/api/v1/items/${item.name}/${item.quantity}`);
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
    axios.post(URL + "/api/v1/items", newItem);
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
