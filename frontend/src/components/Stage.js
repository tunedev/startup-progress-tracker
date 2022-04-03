import { Container, Badge } from "react-bootstrap";
import { FaCheck, FaLock, FaLockOpen, FaPlus } from "react-icons/fa";
import { Modal, ModalContents, ModalOpenButton } from "./modal";
import { TaskUnAuth as Task } from "./Task";
import { AddTask } from "./AddTask";

function StageUnAuth({ stage, index }) {
  return (
    <Container key={JSON.stringify(stage)}>
      <div className="row">
        <div className="d-flex align-items-center show-on-hover-container">
          <Badge bg="dark" className="rounded-circle">
            {index + 1}
          </Badge>
          <h3 className="m-3">{stage.name}</h3>
          {stage.allTaskDone ? (
            <FaCheck />
          ) : !stage.prevStage || stage.prevStage.allTaskDone ? (
            <FaLockOpen />
          ) : (
            <FaLock />
          )}

          <Modal>
            <ModalOpenButton>
              <button
                className="btn btn-dark show-on-hover mx-3 btn-sm"
                title="Create new Task"
              >
                <FaPlus />
              </button>
            </ModalOpenButton>
            <ModalContents title="Create New Task" aria-label="Add New Task">
              <AddTask stageId={stage.id} />
            </ModalContents>
          </Modal>
        </div>
        <div>
          {stage.tasks.map((task) => (
            <Task task={task} key={task.id} stage={stage} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export { StageUnAuth };
