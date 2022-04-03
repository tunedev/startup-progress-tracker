import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useAsync } from "utils/hooks";
import { fetchRandomFact } from "utils/randomFact";
import { Modal, ModalContents, ModalOpenButton } from "components/modal";
import { FaPlusCircle } from "react-icons/fa";
import { useProjectContext } from "context/project-context";
import { StageUnAuth as Stage } from "./Stage";
import { AddStage } from "./AddStage";

function ProjectsUnAuth() {
  const { projects, setProjects } = useProjectContext();
  const { status, data, run } = useAsync();

  useEffect(() => {
    run(fetchRandomFact());
  }, [run]);

  return (
    <Container>
      {projects.stages.every((stage) => stage.allTaskDone) ? (
        status === "resolved" ? (
          <Modal isOpen={true}>
            <ModalContents title="Random Fact" aria-label="Random Fact">
              <div className="mx-3 ">
                <h2>{data}</h2>
              </div>
            </ModalContents>
          </Modal>
        ) : null
      ) : null}
      <h1 className="text-center">{projects.name}</h1>
      <Modal>
        <ModalOpenButton>
          <button className="btn btn-dark d-flex align-items-center mx-3">
            <FaPlusCircle />
            Add new Stage
          </button>
        </ModalOpenButton>
        <ModalContents title="Add New Stage" aria-label="Add New Stage">
          <div className="container">
            <AddStage />
          </div>
        </ModalContents>
      </Modal>
      {projects.stages.length > 0 ? (
        <div className="row ml-3">
          {projects.stages.map((stage, index) => (
            <Stage
              key={stage.id}
              stage={stage}
              index={index}
              setProjects={setProjects}
            />
          ))}
        </div>
      ) : (
        <div className="mx-3">
          <h2>No stages yet</h2>
        </div>
      )}
    </Container>
  );
}

export { ProjectsUnAuth };
