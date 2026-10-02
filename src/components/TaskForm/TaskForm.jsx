import React from "react";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../../redux/tasksSlice";

function TaskForm() {
  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState("medium");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTask = {
      title: title.trim(),
      priority,
      completed: false,
    };

    await dispatch(addTaskAsync(newTask));

    setTitle("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Название задачи"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        name="priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      <button type="submit">Добавить задачу</button>
    </form>
  );
}

export default TaskForm;

// import React from "react";

// function TaskForm({ onAddTask }) {
//   const [title, setTitle] = React.useState("");
//   const [priority, setPriority] = React.useState("medium");
//     // state = {
//     //     title: "",
//     //     priority: "medium"
//     // };

//     // handleChange = event => {
//     //     const { name, value } = event.target;

//     //     this.setState({
//     //         [name]: value
//     //     });
//     // };

//     // handleSubmit = event => {
//     //     event.preventDefault();

//     //     const newTask = {
//     //         id: Date.now(),
//     //         title: this.state.title,
//     //         priority: this.state.priority,
//     //         completed: false
//     //     };

//     //     this.props.onAddTask(newTask);

//     //     this.setState({
//     //       title: "",
//     //       priority: "medium",
//     //     });
//     // }

//     const handleSubmit = (event) => {
//         event.preventDefault();

//       if (!title.trim()) {
//         return;
//       }

//         const newTask = {

//             title: title.trim(),
//             priority,
//             completed: false
//         };

//         onAddTask(newTask);

//         setTitle("");
//         setPriority("medium");
//     };

//     return (
//           <form onSubmit={handleSubmit}>

//             <input
//               type="text"
//               name="title"
//               placeholder="Название задачи"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <select
//               name="priority"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//             >
//               <option value="low">Низкий</option>
//               <option value="medium">Средний</option>
//               <option value="high">Высокий</option>
//             </select>

//             <button type="submit">Добавить задачу</button>
//           </form>
//         );
//     }

// export default TaskForm;
