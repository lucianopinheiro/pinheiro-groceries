import "./ListItems.css";

function PendingItems(props) {
  const handleItem = (item, operation) => {
    // accept 'sel' only on pending list
    if (item.quantity > 0 || operation !== "sel") {
      props.handleItems(item, operation);
    }
  };

  return (
    <ul className="list-items">
      {props.items.map((item) => (
        <li key={item.id} className={item.selected}>
          <span className="listControls--qty">{item.quantity}</span>
          <span className="listControls">
            <button onClick={() => handleItem(item, "add")}>+</button>
            <button onClick={() => handleItem(item, "del")} disabled={!item.quantity}>
              -
            </button>
          </span>
          <span className="listLabel" onClick={() => handleItem(item, "sel")}>
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default PendingItems;
