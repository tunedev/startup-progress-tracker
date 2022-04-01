import { buildSchema } from "graphql";

const schema = buildSchema(`

  type User {
    id: ID!
    username: String!
    password: String!
    projects: [Project!]!
  }

  type Project {
    id: ID!
    name: String!
    userId: ID!
    user: User!
    stages: [Stage!]!
  }


  type Stage {
    id: ID!
    title: String!
    projectId: ID!
    project: Project!
    description: String!
    tasks: [Task]
    allTaskDone: Boolean!
    prevStage: Stage
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    phaseId: ID!
    stage: Stage!
    isDone: Boolean!
  }

  type Query {
    getStages: [Stage]
    getTask(id: ID!): Task
  }

  input CreatePhaseInput {
    id: ID
    title: String!
    description: String!
  }

  input CreateTaskInput {
    id: ID,
    title: String!
    description: String!
    phaseId: ID!
  }

  type Mutation {
    createPhase(input: CreatePhaseInput): Phase
    createTask(input: CreateTaskInput): Task
  }
`);

export default schema;
