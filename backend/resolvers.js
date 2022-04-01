const phaseTable = {};
const taskTable = {};

const getRandomId = () => require("crypto").randomBytes(10).toString("hex");

class Phase {
  constructor(id, { title, description, orderMarker }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.orderMarker = orderMarker;
    this.tasks = Object.values(taskTable).reduce((acc, task) => {
      if (task.phaseId === this.id) {
        acc.push(task.toJSON());
      }
      return acc;
    }, []);
    this.allTaskDone = this.tasks.every((task) => task.isDone);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      orderMarker: this.orderMarker,
      tasks: this.tasks,
      allTaskDone: this.allTaskDone,
    };
  }
}

class Task {
  constructor(id, { title, description, phaseId }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.phaseId = phaseId;
    this.isDone = false;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      phaseId: this.phaseId,
      isDone: this.isDone,
    };
  }
}

const resolvers = {
  getPhase: ({ id }) => {
    return new Phase(id, phaseTable[id]);
  },
  getPhases: () => {
    return Object.values(phaseTable)
      .map((phase) => new Phase(phase.id, phase).toJSON())
      .sort((a, b) => a.orderMarker - b.orderMarker);
  },
  getTask: ({ id }) => {
    return new Task(id, taskTable[id]);
  },
  createTask: ({ input }) => {
    const phaseId = input.phaseId;

    if (!phaseTable[phaseId]) {
      throw new Error(`Phase with id ${phaseId} does not exist`);
    }

    let id = getRandomId();
    const newTask = new Task(id, input);

    taskTable[id] = newTask;
    return newTask.toJSON();
  },

  createPhase: ({ input }) => {
    let id = getRandomId();
    input = { ...input, id, orderMarker: Object.values(phaseTable).length + 1 };
    const newPhase = new Phase(id, input);
    phaseTable[id] = newPhase;
    return newPhase.toJSON();
  },
};

export default resolvers;
