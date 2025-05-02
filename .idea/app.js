const React = require("react");
const { renderToString } = require("react-dom/server");

const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  // Inline styles as JavaScript objects
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
      maxWidth: "400px",
      margin: "0 auto",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    display: {
      fontSize: "64px",
      fontWeight: "bold",
      marginBottom: "24px",
    },
    buttonsContainer: {
      display: "flex",
      gap: "12px",
    },
    buttonBase: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    decreaseButton: {
      backgroundColor: "#e53e3e",
    },
    resetButton: {
      backgroundColor: "#718096",
    },
    increaseButton: {
      backgroundColor: "#38a169",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Counter Example</h2>

      <div style={styles.display}>{count}</div>

      <div style={styles.buttonsContainer}>
        <button
          onClick={decrement}
          style={{ ...styles.buttonBase, ...styles.decreaseButton }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c53030")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#e53e3e")}
        >
          Decrease
        </button>

        <button
          onClick={reset}
          style={{ ...styles.buttonBase, ...styles.resetButton }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4a5568")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#718096")}
        >
          Reset
        </button>

        <button
          onClick={increment}
          style={{ ...styles.buttonBase, ...styles.increaseButton }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2f855a")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#38a169")}
        >
          Increase
        </button>
      </div>
    </div>
  );
}

const renderApp = () => {
  const app = renderToString(<Counter />);
  return app;
};

module.exports = renderApp;
