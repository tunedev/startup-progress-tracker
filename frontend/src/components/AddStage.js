import { v4 as uuid } from "uuid";
import { useProjectContext } from "context/project-context";
import { Project } from "utils/dummyData";
function AddStage() {
  const { projects, setProjects } = useProjectContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = e.target;
    const newStage = {
      id: uuid(),
      name: name.value,
      description: description.value,
      tasks: [],
      allTaskDone: false,
      prevStageId:
        projects.stages.length > 1
          ? projects.stages[projects.stages.length - 1].id
          : null,
    };
    setProjects(
      new Project({
        ...projects,
        stages: [...projects.stages, newStage],
      })
    );
    name.value = "";
    description.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Stage Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter Stage Name"
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="description">Stage Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          placeholder="Enter Stage Description"
        />
      </div>
      <br />
      <button type="submit" className="btn btn-dark">
        Add New Stage
      </button>
    </form>
  );
}

export { AddStage };
