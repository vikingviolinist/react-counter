import { useEffect, useState } from 'react';

import './App.css';

const storeStateInLocalStorage = (count) => {
  localStorage.setItem('countStateFunction', JSON.stringify({ count }));
};

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const cache = localStorage.getItem(key);
    if (cache) return JSON.parse(cache).count;
    return initialState;
  };

  const [count, setCount] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ count }));
  }, [key, count]);

  return [count, setCount];
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, 'countStateFunction');

  const increment = () => {
    setCount((count) => {
      if (count >= max) return count;
      return count + step;
    });
  };

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  useEffect(() => {
    storeStateInLocalStorage(count);
  }, [count]);

  return (
    <main className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={() => setCount(count - step)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </section>
    </main>
  );
};

export default Counter;
