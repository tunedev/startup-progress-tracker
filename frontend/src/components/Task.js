import { Container } from "react-bootstrap";
import { useProjectContext } from "context/project-context";
import { useNotificationCtx } from "context/notification-context";
import { Project, handleTaskToggle } from "utils/dummyData";

function TaskUnAuth({ task, stage }) {
  const { projects, setProjects } = useProjectContext();
  const { setNotification } = useNotificationCtx();
  return (
    <Container key={task.id}>
      <div className="form-check">
        <input
          className="form-check-input"
          id={`task-toggler-${task.id}-${stage.id}`}
          type="checkbox"
          checked={task.done}
          onChange={() => {
            try {
              setProjects(
                new Project(
                  handleTaskToggle({
                    stageId: stage.id,
                    taskId: task.id,
                    projects,
                  })
                )
              );
            } catch (err) {
              console.log(err);
              setNotification({
                message: err.message,
              });
            }
          }}
        />
        <label htmlFor={`task-toggler-${task.id}-${stage.id}`}>
          <h4>{task.name}</h4>
        </label>
      </div>
    </Container>
  );
}

export { TaskUnAuth };
