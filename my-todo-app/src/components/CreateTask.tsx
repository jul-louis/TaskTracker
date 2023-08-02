import { useState } from "react";

interface Task {
  id: string;
  name: string;
  desc: string;
  date: number;
  state: number;
}

function CreateTask() {
  const [task, setTask] = useState({
    id: Math.random() + "+" + Date.now(),
    name: "Default Task Name",
    desc: "Default Task Description",
    date: Date.now(),
    state: 0,
  });

  function createNewTask() {
    let tasksString: string | null = localStorage.getItem("tasks");
    let list: Task[] = JSON.parse(tasksString as string) || [];
    list?.push(task);

    localStorage.setItem("tasks", JSON.stringify(list));
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      name: event.target.value,
    });
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      desc: event.target.value,
    });
  };
  return (
    <div>
      <div className="my-2">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name Your New Task
        </label>
        <input
          type="text"
          id="name"
          onChange={handleNameChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="What are you gonna do?"
          required
        ></input>
      </div>
      <div className="my-2">
        <label
          htmlFor="desc"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          id="desc"
          onChange={handleDescChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Give a detail..."
          required
        ></input>
      </div>
      <button
        onClick={() => {
          createNewTask();
          window.location.reload();
        }}
        type="submit"
        className="my-4 bg-slate-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
      <hr />
    </div>
  );
}

export default CreateTask;
