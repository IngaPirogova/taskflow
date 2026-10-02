import TaskItem from "../TaskItem/TaskItem";

function TaskList({tasks, onDelete, onToggle}) {
    return (
      <main>
      
        {tasks.length === 0 && (<p>Задач пока нет</p>)}
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </ul>
      </main>
    );
}

export default TaskList;