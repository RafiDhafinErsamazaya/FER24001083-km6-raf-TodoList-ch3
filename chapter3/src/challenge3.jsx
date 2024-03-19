import React, { useState, useEffect } from "react";

function Challenge3() {
  const [items, setItems] = useState([
    { name: "ADRO", marketcap: 50, unit: "Milliar" },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedMarketcap, setEditedMarketcap] = useState(0);
  const [editedUnit, setEditedUnit] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [originalItems, setOriginalItems] = useState([...items]);

  useEffect(() => {
    setOriginalItems([...items]);
  }, []);

  const addItem = (newItemName, newItemMarketcap, newItemUnit) => {
    if (newItemName.trim() === "") {
      alert("Kode saham tidak boleh kosong!");
      return;
    }

    if (!newItemMarketcap || isNaN(newItemMarketcap)) {
      alert("Marketcap tidak boleh kosong!");
      return;
    }

    if (newItemMarketcap <= 0) {
      alert("Marketcap harus lebih besar dari 0!");
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
      { name: newItemName, marketcap: newItemMarketcap, unit: newItemUnit },
    ]);
    setOriginalItems([
      ...items,
      { name: newItemName, marketcap: newItemMarketcap, unit: newItemUnit },
    ]);
  };

  const editItem = (index, updatedItem) => {
    if (
      updatedItem.name === items[index].name &&
      updatedItem.marketcap === items[index].marketcap &&
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
      alert("Kode saham sudah ada dalam daftar!");
      return;
    }

    updatedItems[index] = updatedItem;
    setItems(updatedItems);
    alert("Berhasil melakukan edit");
  };

  const removeItem = (index) => {
    setEditIndex(null);
    setItems(items.filter((item, i) => i !== index));
    alert("berhasil melakukan remove");
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
    setItems(uncheckedItems);
    setShowAll(false);
  };

  const showCheckedItems = () => {
    const checkedItemsToShow = items.filter((_, index) =>
      checkedItems.includes(index)
    );
    setItems(checkedItemsToShow);
    setShowAll(false);
  };

  const showAllItems = () => {
    setShowAll(true);
    setItems([...originalItems]);
  };

  // Jumlah item dalam list
  const jumlahItem = items.length;

  const filterItems = () => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  return (
    <div className="px-4 md:px-24">
      <div className="container bg-slate-300 rounded-md shadow-md py-8 px-8">
        <div>
          <h1 className="text-center font-bold text-2xl py-8">
            Data Market Cap IDX Stock
          </h1>
        </div>
        {/* Form penambahan item... */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newItemName = e.target.itemName.value;
            const newItemMarketcap = parseInt(e.target.itemMarketcap.value);
            const newItemUnit = e.target.itemUnit.value; // Mengambil nilai dari input unit
            addItem(newItemName, newItemMarketcap, newItemUnit);
            e.target.reset();
          }}
        >
          <input
            className="border border-gray-500 py-1.5 rounded-md pl-3 ml-4"
            type="text"
            name="itemName"
            placeholder="Item name"
          />
          <input
            className="border border-gray-500 py-1.5 rounded-md pl-3 ml-4"
            type="number"
            name="itemMarketcap"
            placeholder="Marketcap"
          />
          <select
            className="border border-gray-500 py-1.5 rounded-md pl-3 ml-4"
            name="itemUnit"
          >
            <option value="Milliar">Milliar</option>
            <option value="Trilliun">Trilliun</option>
          </select>
          <button
            className="bg-slate-200 font-medium px-3 py-2 rounded-md ml-4"
            type="submit"
          >
            Add Item
          </button>
        </form>
        {/* Inputan Search */}
        <div className="container flex flex-col justify-center items-center mt-4">
          <h1 className="text-center font-bold text-2xl py-4">Search</h1>
          <input
            className="border border-gray-500 py-1.5 rounded-md pl-3 ml-4 w-56"
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        {/* button Show Item */}
        <div className="py-12 px-4">
          <button
            className="bg-green-500 text-white text-base font-medium py-2 px-2 rounded-md mr-2"
            onClick={checkAllItems}
          >
            Check All Items
          </button>
          <button
            className="bg-blue-500 text-white text-base font-medium py-2 px-2 rounded-md ml-1"
            onClick={showUncheckedItems}
          >
            Show Unchecked Items
          </button>
          <button
            className="bg-blue-500 text-white text-base font-medium py-2 px-2 rounded-md ml-2"
            onClick={showCheckedItems}
          >
            Show Checked Items
          </button>
          <button
            className="bg-green-500 text-white text-base font-medium py-2 px-2 rounded-md ml-2"
            onClick={showAllItems}
          >
            Show All Item
          </button>
        </div>
        {/* Hasil Inputan */}
        <table className="justify-start text-center mt-4">
          <thead>
            <tr>
              <th className="px-2 py-2 px-2 py-2 whitespace-nowrap">
                Kode Saham & Marketcap
              </th>
            </tr>
          </thead>
          <tbody>
            {filterItems().map((item, index) => (
              <tr key={item.id}>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        className="border border-gray-500 py-1.5 rounded-md pl-3 mt-2 mr-2"
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
                          editedMarketcap === 0
                            ? item.marketcap
                            : editedMarketcap
                        }
                        onChange={(e) =>
                          setEditedMarketcap(parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <select
                        className="border border-gray-500 py-1.5 rounded-md pl-3 mt-2 mr-2"
                        value={editedUnit === "" ? item.unit : editedUnit}
                        onChange={(e) => setEditedUnit(e.target.value)}
                      >
                        <option value="Milliar">Milliar</option>
                        <option value="Triliun">Triliun</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="bg-green-500 text-white text-base font-medium py-1 px-2 rounded-md mr-2"
                        onClick={() => {
                          if (
                            editedName.trim() !== "" ||
                            editedMarketcap !== ""
                          ) {
                            editItem(index, {
                              ...item,
                              name:
                                editedName.trim() !== ""
                                  ? editedName.trim()
                                  : item.name,
                              marketcap:
                                editedMarketcap !== ""
                                  ? parseInt(editedMarketcap)
                                  : item.marketcap,
                              unit: editedUnit !== "" ? editedUnit : item.unit,
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
                    <td
                      className="border border-yellow-950	rounded-md px-3 py-2 w-28"
                      style={{
                        textDecoration: checkedItems.includes(index)
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      className="border border-yellow-950 px-3 py-2 w-20	"
                      style={{
                        textDecoration: checkedItems.includes(index)
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.marketcap}
                    </td>
                    <td
                      className="border border-yellow-950 px-3 py-2 w-20	"
                      style={{
                        textDecoration: checkedItems.includes(index)
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.unit}
                    </td>
                    <td className="border border-yellow-950 w-20">
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(index)}
                        onChange={() => toggleCheckItem(index)}
                      />
                    </td>
                    <td className="border border-yellow-950	 px-3 py-2">
                      <button
                        className="bg-yellow-500 text-white text-base font-medium py-1 px-2 rounded-md mr-2"
                        onClick={() => {
                          setEditIndex(index);
                          // Reset nilai editedName dan editedMarketcap saat mode edit diaktifkan
                          setEditedName(item.name);
                          setEditedMarketcap(item.marketcap);
                          setEditedUnit(item.unit);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
                <td className="border border-yellow-950	 px-3 py-2">
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
        <div className="flex gap-44">
          <p className="font-medium mt-2">Jumlah Emiten: {jumlahItem}</p>
        </div>
        <div className="flex justify-center mt-12">
          <button
            className="bg-red-500 text-white text-base font-medium py-2 px-8 rounded-md ml-2"
            onClick={removeCheckedItems}
          >
            Remove Checked Items
          </button>
          <button
            className="bg-red-500 text-white text-base font-medium py-2 px-8 rounded-md ml-2"
            onClick={removeAllItems}
          >
            Remove All Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default Challenge3;
