import React, { useState } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);
  const [countNumber, setCountNumber] = useState(0);
  console.log("count number", countNumber);

  const increment = () => {
    if (count >= 10) {
      alert("Cukup");
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    console.log("count", count);
    console.log("count > 0", count > 0);
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("Cukup");
    }
  };

  const reset = () => {
    if (count === 0) {
      alert("udah 0");
      return;
    }
    setCount(0);
    alert("Reset Angka ke 0 ya");
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterApp;
