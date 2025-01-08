import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

// import React, { useReducer } from "react";

// // Reducer function to handle complex state transitions
// function tasksReducer(state, action) {
//   switch (action.type) {
//     case "addTask":
//       return [
//         ...state,
//         { id: Date.now(), text: action.payload, completed: false },
//       ];
//     case "editTask":
//       return state.map((task) =>
//         task.id === action.payload.id
//           ? { ...task, text: action.payload.text }
//           : task
//       );
//     case "deleteTask":
//       return state.filter((task) => task.id !== action.payload);
//     case "toggleCompletion":
//       return state.map((task) =>
//         task.id === action.payload
//           ? { ...task, completed: !task.completed }
//           : task
//       );
//     case "resetTasks":
//       return [];
//     default:
//       throw new Error("Invalid action type");
//   }
// }

// // Initial state
// const initialTasks = [];

// export default function TaskManager() {
//   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

//   const addTask = (text) => dispatch({ type: "addTask", payload: text });
//   const editTask = (id, text) =>
//     dispatch({ type: "editTask", payload: { id, text } });
//   const deleteTask = (id) => dispatch({ type: "deleteTask", payload: id });
//   const toggleCompletion = (id) =>
//     dispatch({ type: "toggleCompletion", payload: id });
//   const resetTasks = () => dispatch({ type: "resetTasks" });

//   return (
//     <div>
//       <h1>Task Manager</h1>
//       <TaskInput onAdd={addTask} />
//       <TaskList
//         tasks={tasks}
//         onEdit={editTask}
//         onDelete={deleteTask}
//         onToggle={toggleCompletion}
//       />
//       <button onClick={resetTasks}>Reset All Tasks</button>
//     </div>
//   );
// }

// // Task input component
// function TaskInput({ onAdd }) {
//   const [text, setText] = React.useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim()) {
//       onAdd(text);
//       setText("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="New task"
//       />
//       <button type="submit">Add Task</button>
//     </form>
//   );
// }

// // Task list component
// function TaskList({ tasks, onEdit, onDelete, onToggle }) {
//   return (
//     <ul>
//       {tasks.map((task) => (
//         <li key={task.id}>
//           <input
//             type="checkbox"
//             checked={task.completed}
//             onChange={() => onToggle(task.id)}
//           />
//           {task.completed ? <s>{task.text}</s> : task.text}
//           <button
//             onClick={() => onEdit(task.id, prompt("Edit Task", task.text))}
//           >
//             Edit
//           </button>
//           <button onClick={() => onDelete(task.id)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   );
// }
