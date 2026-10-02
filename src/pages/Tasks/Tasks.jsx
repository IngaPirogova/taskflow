import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TaskList from "../../components/TaskList/TaskList";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskFilter from "../../components/TaskFilter/taskFilter";
import Section from "../../components/Section/Section";
import TaskStats from "../../components/TaskStats/TaskStats";

import {
  fetchTasks,
  deleteTaskAsync,
  updateTaskAsync,
} from "../../redux/tasksSlice";

import {
  selectTasks,
  selectIsLoading,
  selectError,
  selectFilteredTasks,
  selectTaskStats,
} from "../../redux/selectors";

import { useSearchParams } from "react-router-dom";

function Tasks() {
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);

  const isLoading = useSelector(selectIsLoading);

  const error = useSelector(selectError);

  const filteredTasks = useSelector((state) =>
    selectFilteredTasks(state, filter),
  );

  const stats = useSelector(selectTaskStats);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDeleteTask = (id) => {
    dispatch(deleteTaskAsync(id));
  };

  const handleToggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return;
    }

    dispatch(
      updateTaskAsync({
        id,
        data: {
          completed: !task.completed,
        },
      }),
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const visibleTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <h2>Tasks</h2>

      <input
        type="text"
        placeholder="Поиск"
        value={search}
        onChange={(event) => {
          setSearchParams({
            search: event.target.value,
          });
        }}
      />

      <Section title="Добавить задачу">
        <TaskForm />
      </Section>

      <Section title="Список задач">
        {isLoading && <p>Загрузка задач...</p>}

        {error && <p>Ошибка: {error}</p>}

        <TaskList
          tasks={visibleTasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      </Section>

      <TaskFilter filter={filter} onChange={handleFilterChange} />

      {tasks.length > 0 && (
        <Section title="Статистика">
          <TaskStats total={stats.total} completed={stats.completed} />
        </Section>
      )}
    </>
  );
}

export default Tasks;






// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import TaskList from "../../components/TaskList/TaskList";
// import TaskForm from "../../components/TaskForm/TaskForm";
// import TaskFilter from "../../components/TaskFilter/taskFilter";
// import Section from "../../components/Section/Section";
// import TaskStats from "../../components/TaskStats/TaskStats";

// import { createTask, deleteTask, updateTask } from "../../api/tasksApi";

// import {
//   fetchTasks,
//   addTask,
//   removeTask,
//   replaceTask,
// } from "../../redux/tasksSlice";

// import {
//   selectTasks,
//   selectIsLoading,
//   selectError,
// } from "../../redux/selectors";

// import { useNavigate, useSearchParams } from "react-router-dom";

// function Tasks() {
//   const [filter, setFilter] = useState("all");

//   const dispatch = useDispatch();

//   // const tasks = useSelector((state) => state.tasks.items);
// const tasks = useSelector(selectTasks);
//   // const isLoading = useSelector((state) => state.tasks.isLoading);
// const isLoading = useSelector(selectIsLoading);
//   // const error = useSelector((state) => state.tasks.error);
//   const error = useSelector(selectError);

//   const navigate = useNavigate();

//   const [searchParams, setSearchParams] = useSearchParams();

//   const search = searchParams.get("search") || "";

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const handleAddTask = async (task) => {
//     try {
//       const createdTask = await createTask(task);

//       dispatch(addTask(createdTask));

//       navigate(`/tasks/${createdTask.id}`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteTask = async (id) => {
//     console.log("Удаляем id:", id);

//     try {
//       await deleteTask(id);

//       dispatch(removeTask(id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleToggleTask = async (id) => {
//     const task = tasks.find((task) => task.id === id);

//     if (!task) {
//       return;
//     }

//     try {
//       const updatedTask = await updateTask(id, {
//         completed: !task.completed,
//       });

//       dispatch(replaceTask(updatedTask));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   const visibleTasks = tasks
//     .filter((task) => {
//       if (filter === "completed") {
//         return task.completed;
//       }

//       if (filter === "active") {
//         return !task.completed;
//       }

//       return true;
//     })
//     .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

//   const countTotalTasks = () => {
//     return tasks.length;
//   };

//   const countCompletedTasks = () => {
//     return tasks.filter((task) => task.completed).length;
//   };

//   return (
//     <>
//       <h2>Tasks</h2>

//       <input
//         type="text"
//         placeholder="Поиск"
//         value={search}
//         onChange={(event) => {
//           setSearchParams({
//             search: event.target.value,
//           });
//         }}
//       />

//       <Section title="Добавить задачу">
//         <TaskForm onAddTask={handleAddTask} />
//       </Section>

//       <Section title="Список задач">
//         {isLoading && <p>Загрузка задач...</p>}

//         {error && <p>Ошибка: {error}</p>}

//         <TaskList
//           tasks={visibleTasks}
//           onDelete={handleDeleteTask}
//           onToggle={handleToggleTask}
//         />
//       </Section>

//       <TaskFilter filter={filter} onChange={handleFilterChange} />

//       {tasks.length > 0 && (
//         <Section title="Статистика">
//           <TaskStats
//             total={countTotalTasks()}
//             completed={countCompletedTasks()}
//           />
//         </Section>
//       )}
//     </>
//   );
// }

// export default Tasks;

// import { useState, useEffect } from "react";

// import TaskList from "../../components/TaskList/TaskList";
// import TaskForm from "../../components/TaskForm/TaskForm";
// import TaskFilter from "../../components/TaskFilter/taskFilter";
// import Section from "../../components/Section/Section";
// import TaskStats from "../../components/TaskStats/TaskStats";

// import { getTasks, createTask, deleteTask, updateTask } from "../../api/tasksApi";

// import { useNavigate } from "react-router-dom";

// import { useSearchParams } from "react-router-dom";

// function Tasks() {
//     // const [tasks, setTasks] = useState([]);
//     const [filter, setFilter] = useState("all");
//     // const [loading, setLoading] = useState(false);
//     // const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     const [searchParams, setSearchParams] = useSearchParams();
//     const search = searchParams.get("search") || "";

// const handleAddTask = async (task) => {
//   setError(null);
//   try {
//     const createdTask = await createTask(task);

//       setTasks((prevTasks) => [...prevTasks, createdTask]);

//       navigate(`/tasks/${createdTask.id}`);
//   } catch (error) {
//     setError(error.message);
//   }
// };

// const handleDeleteTask = async (id) => {
//   console.log("Удаляем id:", id);

//   setError(null);

//   try {
//     await deleteTask(id);

//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//   } catch (error) {
//     setError(error.message);
//   }
// };

// const handleToggleTask = async (id) => {
//   setError(null);

//   const task = tasks.find((task) => task.id === id);

//   if (!task) {
//     return;
//   }

//   try {
//     const updatedTask = await updateTask(id, {
//       completed: !task.completed,
//     });

//     setTasks((prevTasks) =>
//       prevTasks.map((task) => (task.id === id ? updatedTask : task)),
//     );
//   } catch (error) {
//     setError(error.message);
//   }
// };

// const handleFilterChange = (newFilter) => {
//   setFilter(newFilter);
// };

// const visibleTasks = tasks.filter((task) => {
//   if (filter === "completed") {
//     return task.completed;
//   }

//   if (filter === "active") {
//     return !task.completed;
//   }

//   return true;
// })
//     .filter((task) => {
//         return task.title.toLowerCase().includes(search.toLowerCase());
//     });

// const countTotalTasks = () => {
//   return tasks.length;
// };

// const countCompletedTasks = () => {
//   return tasks.filter((task) => task.completed).length;
// };

// useEffect(() => {
//   const loadTasks = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await getTasks();

//       setTasks(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadTasks();
// }, []);

//   return (
//     <>
//       <h2>Tasks</h2>

//       <input
//         type="text"
//         placeholder="Поиск"
//         value={search}
//         onChange={(event) => {
//           setSearchParams({ search: event.target.value });
//         }}
//       />

//       <Section title="Добавить задачу">
//         <TaskForm onAddTask={handleAddTask} />
//       </Section>

//       <Section title="Список задач">
//         {loading && <p>Загрузка задач...</p>}

//         {error && <p>Ошибка: {error}</p>}

//         <TaskList
//           tasks={visibleTasks}
//           onDelete={handleDeleteTask}
//           onToggle={handleToggleTask}
//         />
//       </Section>
//       <TaskFilter filter={filter} onChange={handleFilterChange} />

//       {tasks.length > 0 && (
//         <Section title="Статистика">
//           <TaskStats
//             total={countTotalTasks()}
//             completed={countCompletedTasks()}
//           />
//         </Section>
//       )}
//     </>
//   );
// };

// export default Tasks;
