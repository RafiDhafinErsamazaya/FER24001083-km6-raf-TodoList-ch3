import React, { useState } from "react";

function ShoppingListApp() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const editItem = (index, updatedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
    setEditIndex(null); // tambahkan setEditIndex(null) untuk menghentikan mode edit setelah diedit
  };

  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newItemName = e.target.itemName.value;

          addItem({
            id: Date.now(),
            name: newItemName,
            quantity: 1,
          });
          e.target.reset();
        }}
      >
        <input type="text" name="itemName" placeholder="Item name" />

        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button
                  onClick={() => {
                    editItem(index, {
                      ...item,
                      name: editedName,
                    });
                    setEditedName(""); // Mengosongkan setelah diedit
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{item.name}</span>
                <span>{item.quantity}</span>
                <button onClick={() => setEditIndex(index)}>Edit</button>
              </>
            )}
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListApp;
