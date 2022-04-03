import { useState } from "react";
import { useProjectContext } from "context/project-context";
import { Project } from "utils/dummyData";
import { useModalCtx } from "./modal";
function EditProjectName() {
  const { projects, setProjects } = useProjectContext();
  const [projectName, setProjectname] = useState(projects.name);
  const { setIsOpen } = useModalCtx();

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjects(
      new Project({
        ...projects,
        name: projectName,
      })
    );
    setIsOpen(false);
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
          value={projectName}
          onChange={(e) => setProjectname(e.target.value)}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-dark">
        Edit Project Name
      </button>
    </form>
  );
}

export { EditProjectName };
