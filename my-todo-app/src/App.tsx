// import { useState } from "react";
import "./App.css";
import ToDoList from "./components/TodoList";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="overflow-auto bg-white dark:bg-slate-900 h-screen p-4">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <ToDoList />
    </div>
  );
}

export default App;
