import { Component } from 'react';

import './App.css';

const storeStateInLocalStorage = (count) => {
  localStorage.setItem('countStateClass', JSON.stringify({ count }));
};

const getStateFromLocalStorage = (initialState, key) => {
  const cache = localStorage.getItem(key);
  if (cache) return JSON.parse(cache);
  return { count: initialState };
};

class CounterClass extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage(0, 'countStateClass');
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidUpdate() {
    storeStateInLocalStorage(this.state.count);
  }

  increment() {
    this.setState((state, props) => {
      if (state.count >= props.max) return;
      return { count: state.count + props.step };
    });
  }

  decrement() {
    this.setState((state, props) => {
      if (state.count <= 0) return;
      return { count: state.count - props.step };
    });
  }

  reset() {
    this.setState(() => {
      return { count: 0 };
    });
  }

  render() {
    return (
      <main className="Counter">
        <p className="count">{this.state.count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </main>
    );
  }
}

export default CounterClass;
