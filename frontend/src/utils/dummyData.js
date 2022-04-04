const stagesDb = [
  {
    id: 1,
    name: "Foundation",
    description: "This is the first stage",
    projectId: 1,
    prevStageId: null,
    tasks: [
      {
        id: 1,
        name: "Setup virtual office",
        description: "This is the first task",
        done: true,
      },
      {
        id: 2,
        name: "Set mission & vision",
        description: "This is task 2",
        done: true,
      },
      {
        id: 3,
        name: "Select business name",
        description: "This is task 3",
        done: true,
      },
      {
        id: 4,
        name: "Buy domains",
        description: "This is task 4",
        done: true,
      },
    ],
  },
  {
    id: 2,
    name: "Discovery",
    description: "This is stage 2",
    projectId: 1,
    prevStageId: 1,
    tasks: [
      {
        id: 1,
        name: "Create roadmap",
        description: "This is the first task",
        done: true,
      },
      {
        id: 2,
        name: "Competitor analysis",
        description: "This is task 2",
        done: false,
      },
    ],
  },
  {
    id: 3,
    name: "Delivery",
    description: "This is stage 3",
    projectId: 1,
    prevStageId: 2,
    tasks: [
      {
        id: 1,
        name: "Release marketing website",
        description: "This is the first task",
        done: false,
      },
      {
        id: 2,
        name: "Release MVP",
        description: "This is task 2",
        done: false,
      },
    ],
  },
];

export class Task {
  constructor({ id, name, description, done }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.done = done;
  }
}

class Stage {
  constructor(stage) {
    this.id = stage.id;
    this.name = stage.name;
    this.description = stage.description;
    this.projectId = stage.projectId;
    this.allTaskDone =
      stage.tasks.length > 0 && stage.tasks.every((task) => task.done === true);
    this.prevStageId = stage.prevStageId;
    this.tasks = stage.tasks.map((task) => new Task(task));
  }
}

export class Project {
  constructor(project) {
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
    const stagesWithoutPrevStage = project.stages.map(
      (stage) => new Stage(stage)
    );
    this.stages = stagesWithoutPrevStage.map((s) => {
      return {
        ...s,
        prevStage: s.prevStageId
          ? stagesWithoutPrevStage.find(
              (dbStage) => dbStage.id === s.prevStageId
            )
          : null,
      };
    });
  }

  handleTaskToggle = ({ stageId, taskId }) => {
    const stage = this.stages.find((s) => s.id === stageId);
    const task = stage.tasks.find((task) => task.id === taskId);
    let prevStage;
    if (stage.prevStageId) {
      prevStage = this.stages.find((s) => s.id === stage.prevStageId);
    }
    if (!prevStage || prevStage.allTaskDone) {
      task.done = !task.done;
      return this;
    }
    throw new Error("Ensure all tasks in previous stage has been completed ");
  };
}
const projectDb = {
  id: 1,
  name: "Project 1",
  description: "Project 1 description",
  stages: [],
};

export const project = new Project(projectDb);

export const handleTaskToggle = ({ stageId, taskId, projects }) => {
  const project = new Project(projects);
  return project.handleTaskToggle({ stageId, taskId });
};
