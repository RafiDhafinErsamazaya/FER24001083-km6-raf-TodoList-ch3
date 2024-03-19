import React, { useState } from "react";

function ShoppingListApp() {
  const [items, setItems] = useState([{ name: "Baju Raye", quantity: 5 }]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState(0);

  const addItem = (newItemName, newItemQuantity) => {
    if (newItemName.trim() === "") {
      alert("Nama barang tidak boleh kosong!");
      return;
    }

    if (!newItemQuantity || isNaN(newItemQuantity)) {
      alert("Quantity tidak boleh kosong!");
      return;
    }

    if (newItemQuantity <= 0) {
      alert("Quantity harus lebih besar dari 0!");
      return;
    }
    // Memeriksa apakah item sudah ada sebelumnya
    const itemExists = items.some(
      (item) => item.name.toLowerCase() === newItemName.toLowerCase()
    );
    if (itemExists) {
      alert("Inputan sudah ada sebelumnya");
      return;
    }
    setItems([
      ...items,
      { id: Date.now(), name: newItemName, quantity: newItemQuantity },
    ]);
  };

  const editItem = (index, updatedItem) => {
    if (
      updatedItem.name === items[index].name &&
      updatedItem.quantity === items[index].quantity
    ) {
      // Jika tidak ada perubahan, tidak perlu memperbarui item
      setEditIndex(null);
      return;
    }
    const updatedItems = [...items];
    const editedNameExists = items.some(
      (item, i) =>
        i !== index &&
        item.name.toLowerCase() === updatedItem.name.toLowerCase()
    );
    if (editedNameExists) {
      alert("Nama barang sudah ada dalam daftar!");
      return;
    }
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  const removeItem = (index) => {
    setEditIndex(null);
    setItems(items.filter((item, i) => i !== index));
  };

  // Jumlah item dalam list
  const jumlahItem = items.length;

  // Totalin quantity
  const total = items.reduce((prev, curr) => {
    return prev + curr.quantity;
  }, 0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="container rounded-md shadow-md py-8 px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newItemName = e.target.itemName.value;
            const newItemQuantity = parseInt(e.target.itemQuantity.value);
            addItem(newItemName, newItemQuantity);
            e.target.reset();
          }}
        >
          <input
            className="border border-gray-500 py-1.5 rounded-md pl-3"
            type="text"
            name="itemName"
            placeholder="Item name"
          />
          <input
            className="border border-gray-500 py-1.5 rounded-md pl-3 ml-4"
            type="number"
            name="itemQuantity"
            placeholder="Quantity"
          />
          <button
            className="bg-slate-200 font-medium px-3 py-2 rounded-md ml-4"
            type="submit"
          >
            Add Item
          </button>
        </form>
        <table className="justify-start text-left mt-4 p-8">
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        className="border border-gray-500 py-1.5 rounded-md pl-3 mr-2"
                        type="text"
                        value={editedName === "" ? item.name : editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="border border-gray-500 py-1.5 rounded-md pl-3 mt-2 mr-2"
                        type="number"
                        value={
                          editedQuantity === 0 ? item.quantity : editedQuantity
                        }
                        onChange={(e) =>
                          setEditedQuantity(parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="bg-green-500 text-white text-base font-medium py-1 px-2 rounded-md mr-2"
                        onClick={() => {
                          if (
                            editedName.trim() !== "" ||
                            editedQuantity !== ""
                          ) {
                            editItem(index, {
                              ...item,
                              name:
                                editedName.trim() !== ""
                                  ? editedName.trim()
                                  : item.name,
                              quantity:
                                editedQuantity !== ""
                                  ? parseInt(editedQuantity)
                                  : item.quantity,
                            });
                            setEditIndex(null);
                          }
                        }}
                      >
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-b-slate-800 px-3 py-2">
                      {item.name}
                    </td>
                    <td className="border border-b-slate-800 px-3 py-2">
                      {item.quantity}
                    </td>
                    <td className="border border-b-slate-800 px-3 py-2">
                      <button
                        className="bg-yellow-500 text-white text-base font-medium py-1 px-2 rounded-md mr-2"
                        onClick={() => {
                          setEditIndex(index);
                          // Reset nilai editedName dan editedQuantity saat mode edit diaktifkan
                          setEditedName(item.name);
                          setEditedQuantity(item.quantity);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
                <td className="border border-b-slate-800 px-3 py-2">
                  <button
                    className="bg-red-500 text-white text-base font-medium py-1 px-2 rounded-md"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-44">
          <p className="font-medium mt-2">Jumlah Item: {jumlahItem}</p>
          <p className="font-medium mt-2">Total: {total}</p>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListApp;
