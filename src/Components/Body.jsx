import ListItems from "./ListItems";
import "./Body.css";
import { useState } from "react";

function Body() {
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

  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);

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
