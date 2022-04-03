import { v4 as uuid } from "uuid";
import { useState } from "react";

import { useProjectContext } from "context/project-context";
import { Project, Task } from "utils/dummyData";
import { useModalCtx } from "./modal";

function AddTask({ stageId }) {
  const { projects, setProjects } = useProjectContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { setIsOpen } = useModalCtx();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuid(),
      name,
      description,
      done: false,
    };
    setProjects(
      new Project({
        ...projects,
        stages: projects.stages.map((s) =>
          s.id === stageId
            ? { ...s, tasks: [...s.tasks, new Task(newTask)] }
            : s
        ),
      })
    );

    setDescription("");
    setName("");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-dark">
        Add New Task
      </button>
    </form>
  );
}

export { AddTask };
