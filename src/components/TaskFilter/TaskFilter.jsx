function TaskFilter({ filter, onChange }) {
  return (
    <select value={filter} onChange={(event) => onChange(event.target.value)}>
      <option value="all">Все</option>
      <option value="completed">Выполненные</option>
      <option value="active">Невыполненные</option>
    </select>
  );
}

export default TaskFilter;
