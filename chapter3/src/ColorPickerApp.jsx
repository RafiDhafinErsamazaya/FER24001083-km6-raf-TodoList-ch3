import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment1 = () => {
    setCount(count + 1);
  };

  const decrement1 = () => {
    setCount(count - 1);
  };
  const increment2 = () => {
    setCount(count + 2);
  };

  const decrement2 = () => {
    setCount(count - 2);
  };

  return (
    <div>
      <div className="font-bold text-4xl py-10">NGITUNG KUY</div>
      <p className="bg-[#da4848] text-3xl rounded border-white border">
        Count: {count}
      </p>
      <div className="space-x-10 space-y-10  ">
        <button
          className="border rounded bg-[#5CB85F] px-2.5 py-2 text-white font-semibold  border-white border"
          onClick={increment1}
        >
          NAIK 1
        </button>
        <button
          className="border rounded bg-[#5CB85F] px-2.5 py-2 text-white font-semibold  border-white border"
          onClick={increment2}
        >
          NAIK 2
        </button>
        <button
          className="border rounded bg-[#5CB85F] px-2.5 py-2 text-white font-semibold  border-white border"
          onClick={decrement1}
        >
          TURUN 1
        </button>

        <button
          className="border rounded bg-[#5CB85F] px-2.5 py-2 text-white font-semibold  border-white border"
          onClick={decrement2}
        >
          TURUN 2
        </button>
      </div>
    </div>
  );
}

export default Counter;
