// import React from "react";
import { format } from "date-fns";
import CreateTask from "./CreateTask";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  name: string;
  desc: string;
  date: number;
  status: number;
}

function ToDoList() {
  const [tasks, setList] = useState<Task[]>([]);

  useEffect(() => {
    const tasksString: string | null = localStorage.getItem("tasks");
    const tasks: Task[] = tasksString ? JSON.parse(tasksString) : [];
    setList(tasks);
  }, []);
  return (
    <>
      <div className="overflow-auto bg-white dark:bg-slate-800 rounded-lg px-6 py-6 ring-1 ring-slate-900/5 shadow-xl">
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
            <span className="px-4">Tasks</span>
          </div>
        </div>
        <CreateTask />

        <p className="text-slate-500 dark:text-slate-400 my-4 text-sm">
          If you want to build a ship, don't drum up people to collect wood and
          don't assign them tasks and work, but rather teach them to long for
          the endless immensity of the sea.
        </p>
        {tasks.length === 0 ? (
          <div className="text-xl font-bold bg-slate-200 text-black dark:text-white dark:bg-slate-600 my-4 p-4 rounded-lg ">
            You Don't have nothing to do Currently. Go Sleep.
          </div>
        ) : (
          tasks.map(function (data) {
            return (
              <div
                key={data.id}
                className="bg-slate-300 text-black dark:text-white dark:bg-slate-700 my-4 p-4 rounded-lg "
              >
                <h2 className="text-2xl font-bold break-all">{data.name}</h2>
                <div className="float-right">
                  <button className="my-4 ml-4 bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Done
                  </button>
                  <button className="my-4 mx-4 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </div>
                <p className="bg-slate-400 dark:bg-slate-900 p-4 my-2 break-all rounded-lg">
                  {data.desc}
                </p>
                <p className="mt-4">
                  Deadline: {format(data.date, "MMMM do, yyyy H:mma")}
                </p>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default ToDoList;
