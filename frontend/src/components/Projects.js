import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useAsync } from "utils/hooks";
import { fetchRandomFact } from "utils/randomFact";
import { Modal, ModalContents, ModalOpenButton } from "components/modal";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useProjectContext } from "context/project-context";
import { StageUnAuth as Stage } from "./Stage";
import { AddStage } from "./AddStage";
import { EditProjectName } from "./EditProjectName";
function ProjectsUnAuth() {
  const { projects, setProjects } = useProjectContext();
  const { status, data, run } = useAsync();

  console.log("projects", projects);

  useEffect(() => {
    run(fetchRandomFact());
  }, [run]);

  return (
    <Container>
      {projects.stages.length > 0 &&
      projects.stages.every((stage) => stage.allTaskDone === true) ? (
        status === "resolved" ? (
          <Modal isOpen={true}>
            <ModalContents title="Random Fact" aria-label="Random Fact">
              <div className="mx-3 ">
                <h5>{data}</h5>
              </div>
            </ModalContents>
          </Modal>
        ) : null
      ) : null}
      <h1 className="text-center mb-4 show-on-hover-container">
        {projects.name}
        <Modal>
          <ModalOpenButton>
            <button
              className="btn btn-dark show-on-hover mx-3 btn-sm"
              title="Create new Task"
            >
              <FaEdit />
            </button>
          </ModalOpenButton>
          <ModalContents
            title="Edit Project Name"
            aria-label="Edit Project Title"
          >
            <EditProjectName />
          </ModalContents>
        </Modal>
      </h1>
      <Modal>
        <ModalOpenButton>
          <button className="btn btn-dark d-flex align-items-center mx-3">
            <FaPlus /> <span className="mx-2">Add new Stage</span>
          </button>
        </ModalOpenButton>
        <ModalContents title="Add New Stage" aria-label="Add New Stage">
          <div className="container">
            <AddStage />
          </div>
        </ModalContents>
      </Modal>
      {projects.stages.length > 0 ? (
        <div className="row m-3">
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
        <div className="m-3">
          <h2>No stages yet</h2>
        </div>
      )}
      {projects.stages.length > 0 ? (
        <button
          className="btn btn-outline-danger mt-5 center"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete all projects?")
            ) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          Reset Project
        </button>
      ) : null}
    </Container>
  );
}

export { ProjectsUnAuth };
