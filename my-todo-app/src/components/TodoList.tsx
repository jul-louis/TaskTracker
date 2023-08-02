// import React from "react";
import { format } from "date-fns";
import CreateTask from "./CreateTask";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  name: string;
  desc: string;
  date: number;
  state: number;
}

function ToDoList() {
  const [tasks, setList] = useState<Task[]>([]);

  useEffect(() => {
    const tasksString: string | null = localStorage.getItem("tasks");
    const tasks: Task[] = tasksString ? JSON.parse(tasksString) : [];

    tasks.sort((a, b) => {
      if (a.state !== b.state) {
        // Sort by state if states are different
        return a.state - b.state;
      } else {
        // Sort by date if states are the same
        return b.date - a.date;
      }
    });

    setList(tasks);
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-6 ring-1 ring-slate-900/5 shadow-xl">
        <div>
          <div className="pb-4 font-medium text-3xl text-black dark:text-white">
            <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              ></svg>
            </span>
            <span className="px-4">Task Tracker</span>
          </div>
        </div>
        <CreateTask />

        <p className="text-slate-500 dark:text-slate-400 my-4 text-sm">
          If you want to build a ship, don't drum up people to collect wood and
          don't assign them tasks and work, but rather teach them to long for
          the endless immensity of the sea.
        </p>

        <div
          className={
            tasks.length === 0
              ? "overflow-scroll h-96 p-1"
              : "overflow-scroll h-96 p-1 grid grid-cols-2 gap-4"
          }
        >
          {tasks.length === 0 ? (
            <div className="text-xl font-bold bg-slate-200 text-black dark:text-white dark:bg-slate-600 my-2 p-4 rounded-lg ">
              You don't any outstanding tasks right now. Go to Sleep.
            </div>
          ) : (
            tasks.map(function (data) {
              return (
                <div
                  key={data.id}
                  className={
                    data.state === 1
                      ? "bg-slate-300 dark:bg-slate-950 hover:bg-slate-950 hover:outline hover:outline-2 bg-slate-300 text-black dark:text-white mt-4 p-4 rounded-lg"
                      : "bg-slate-400 dark:bg-slate-700 hover:bg-slate-950 hover:outline hover:outline-2 bg-slate-300 text-black dark:text-white mt-4 p-4 rounded-lg"
                  }
                >
                  <h2 className="text-2xl font-medium break-all">
                    {data.state === 1 ? <span>✅ </span> : <></>}
                    {data.name}
                  </h2>
                  <div className="float-right">
                    {data.state === 0 ? (
                      <button
                        type="submit"
                        onClick={() => {
                          // Update status of the task with the specified id to 1
                          const updatedTasks = tasks.map((task) =>
                            task.id === data.id ? { ...task, state: 1 } : task
                          );

                          // Set the new tasks list in the state
                          setList(updatedTasks);
                          localStorage.setItem(
                            "tasks",
                            JSON.stringify(updatedTasks)
                          );
                          window.location.reload();
                        }}
                        className="my-4 ml-4 bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={() => {
                          // Update status of the task with the specified id to 1
                          const updatedTasks = tasks.map((task) =>
                            task.id === data.id ? { ...task, state: 0 } : task
                          );

                          // Set the new tasks list in the state
                          setList(updatedTasks);
                          localStorage.setItem(
                            "tasks",
                            JSON.stringify(updatedTasks)
                          );
                          window.location.reload();
                        }}
                        className="my-4 ml-4 bg-slate-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Redo
                      </button>
                    )}
                    <button
                      type="submit"
                      onClick={() => {
                        const newTasks = tasks.filter(
                          (task) => task.id !== data.id
                        );
                        setList(newTasks);
                        localStorage.setItem("tasks", JSON.stringify(newTasks));
                      }}
                      className="my-4 mx-4 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="bg-slate-400 dark:bg-slate-900 p-4 my-2 break-all rounded-lg">
                    {data.desc}
                  </p>
                  <p className="mt-4">
                    Creation Date: {format(data.date, "MMMM do, yyyy H:mma")}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default ToDoList;
