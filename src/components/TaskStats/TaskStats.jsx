function TaskStats({ total, completed }) {
  return (
    <div>
      <p>Всего задач: {total}</p>
      <p>Выполнено: {completed}</p>
    </div>
  );
}

export default TaskStats;
