import { useParams } from "react-router-dom";

function TaskDetails() {
  const { taskId } = useParams();

  return (
    <section>
      <h2>Задача</h2>
      <p>ID задачи: {taskId}</p>
    </section>
  );
}

export default TaskDetails;
