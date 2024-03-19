import React, { useState } from "react";

function ShoppingListApp() {
  const [items, setItems] = useState([
    { name: "ADRO", profit: 5, unit: "Milliar" },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedProfit, setEditedProfit] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);

  const addItem = (newItemName, newItemProfit, newItemUnit) => {
    if (newItemName.trim() === "") {
      alert("Nama barang tidak boleh kosong!");
      return;
    }

    if (!newItemProfit || isNaN(newItemProfit)) {
      alert("Profit tidak boleh kosong!");
      return;
    }

    if (newItemProfit <= 0) {
      alert("Profit harus lebih besar dari 0!");
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
      {
        id: Date.now(),
        name: newItemName,
        profit: newItemProfit,
        unit: newItemUnit,
      },
    ]);
  };

  const editItem = (index, updatedItem) => {
    if (
      updatedItem.name === items[index].name &&
      updatedItem.profit === items[index].profit &&
      updatedItem.unit === items[index].unit
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

  const toggleCheckItem = (index) => {
    const isChecked = checkedItems.includes(index);
    if (isChecked) {
      setCheckedItems(checkedItems.filter((item) => item !== index));
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };

  const removeCheckedItems = () => {
    const filteredItems = items.filter(
      (item, index) => !checkedItems.includes(index)
    );
    setItems(filteredItems);
    setCheckedItems([]);
  };

  const removeAllItems = () => {
    setItems([]);
    setCheckedItems([]);
  };

  const checkAllItems = () => {
    if (checkedItems.length === items.length) {
      // Jika semua item sudah dicentang, maka hilangkan semua centang
      setCheckedItems([]);
    } else {
      // Jika ada item yang belum dicentang, centang semua item
      const allItemIndexes = items.map((_, index) => index);
      setCheckedItems(allItemIndexes);
    }
  };

  const showUncheckedItems = () => {
    const uncheckedItems = items.filter(
      (_, index) => !checkedItems.includes(index)
    );
    setCheckedItems([]);
    setItems(uncheckedItems);
  };

  const showCheckedItems = () => {
    const checkedItemsToShow = items.filter((_, index) =>
      checkedItems.includes(index)
    );
    setItems(checkedItemsToShow);
  };

  // Jumlah item dalam list
  const jumlahItem = items.length;

  // Totalin profit
  const totalProfit = items.reduce((prev, curr) => {
    return prev + curr.profit;
  }, 0);

  return (
    <div className="px-48 ">
      <div className="container bg-slate-300 rounded-md shadow-md py-8 px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newItemName = e.target.itemName.value;
            const newItemProfit = parseInt(e.target.itemProfit.value);
            const newItemUnit = e.target.itemUnit.value;
            addItem(newItemName, newItemProfit, newItemUnit);
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
            name="itemProfit"
            placeholder="Market Cap"
          />
          <select
            className="border border-gray-500 py-1.5 rounded-md pl-3 ml-4"
            placeholder="p"
            name="itemUnit"
          >
            <option value="Miliar">Milliar</option>
            <option value="Triliun">Trilliun</option>
          </select>
          <button
            className="bg-slate-200 font-medium px-3 py-2 rounded-md ml-4"
            type="submit"
          >
            Add Item
          </button>
        </form>
        <div className="py-8">
          <button
            className="bg-green-500 text-white text-base font-medium py-2 px-20 rounded-md mr-2"
            onClick={checkAllItems}
          >
            ALL
          </button>
          <button
            className="bg-blue-500 text-white text-base font-medium py-2 px-20 rounded-md ml-2"
            onClick={showUncheckedItems}
          >
            To Do
          </button>
          <button
            className="bg-blue-500 text-white text-base font-medium py-2 px-20 rounded-md ml-2"
            onClick={showCheckedItems}
          >
            DONE
          </button>
        </div>

        <table className="justify-start text-center my-4 p-8">
          <thead>
            <tr>
              <th>Kode Saham & Profit</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-b-slate-800 px-5 py-2">
                  {item.name}
                </td>
                <td className="border border-b-slate-800 px-5 py-2">
                  {item.profit}
                </td>
                <td className="border border-b-slate-800 px-5 py-2">
                  {item.unit}
                </td>
                <td className="border border-b-slate-800 px-10 py-2">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(index)}
                    onChange={() => toggleCheckItem(index)}
                  />
                </td>
                <td className="border border-b-slate-800 px-3 py-2">
                  <button
                    className="bg-yellow-500 text-white text-base font-medium py-1 px-2 rounded-md mr-2"
                    onClick={() => {
                      setEditIndex(index);
                      // Reset nilai editedName dan editedProfit saat mode edit diaktifkan
                      setEditedName(item.name);
                      setEditedProfit(item.profit);
                      setEditedUnit(item.unit);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-b-slate-800 px-3 py-2">
                  <button
                    className="bg-red-500 text-white text-base font-medium py-1 px-2 rounded-md"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-16">
          <p className="font-medium mt-2">Jumlah Item: {jumlahItem}</p>
          <p className="font-medium mt-2">Total Profit: {totalProfit}</p>
        </div>
        <div className="mt-10 px-8">
          <button
            className="bg-red-500 text-white text-base font-medium py-2 px-2 mr-12 rounded-md"
            onClick={removeCheckedItems}
          >
            Remove Checked Items
          </button>
          <button
            className="bg-red-500 text-white text-base font-medium py-2 px-2 rounded-md"
            onClick={removeAllItems}
          >
            Remove All Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListApp;
