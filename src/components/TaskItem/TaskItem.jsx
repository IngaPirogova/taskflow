import styles from "./TaskItem.module.css";
import { Link } from "react-router-dom";


function TaskItem({ task, onDelete, onToggle }) {
    return (
      <li className={styles.item}>
      <article className={styles.card}>
        <h2 className={styles.title}>{task.title}</h2>
        <p>Приоритет: {task.priority}</p>

        {task.priority === "high" && <span>Важно</span>}

        <p>Статус: {task.completed ? "✔ Выполнено" : "❌ Не выполнено"}</p>

        <Link to={`/tasks/${task.id}`}>Подробнее</Link>
        
        </article>
        <div className={styles.actions}>
          <button className={styles.completeButton} onClick={() => onToggle(task.id)}>
            {task.completed ? "Вернуть" : "Выполнить"}
          </button>
          <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
            Удалить
          </button>
        </div>
      </li>
  );
}

export default TaskItem;