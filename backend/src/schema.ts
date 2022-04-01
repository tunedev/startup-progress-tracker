import { makeExecutableSchema } from "@graphql-tools/schema";
import { Query, Mutation } from "./resolvers";

const typeDefs = /* GraphQL */ `
  type Query {
    getProjects(userId: Int): [Project!]!
    getStages(projectId: Int): [Stage!]!
  }

  type Mutation {
    signup(username: String!, password: String!): User!
    signin(username: String!, password: String!): User!
    createProject(name: String!, description: String): Project!
    createStage(name: String!, projectId: Int!, description: String!): Stage!
    createTask(name: String!, stageId: Int!, description: String): Task!
    toggleTaskStatus(taskId: Int!): Task!
  }

  type User {
    id: ID!
    username: String!
    token: String!
    projects: [Project!]!
  }

  type Project {
    id: ID!
    name: String!
    userId: ID!
    user: User!
    description: String
    stages: [Stage!]!
  }

  type Stage {
    id: ID!
    name: String!
    projectId: ID!
    project: Project!
    prevStageId: ID
    prevStage: Stage
    relatedStages: [Stage]
    allTaskDone: Boolean!
    description: String
    tasks: [Task]
  }

  type Task {
    id: ID!
    name: String!
    stageId: ID!
    stage: Stage!
    description: String
    done: Boolean!
  }
`;

const resolvers = {
  Mutation,
  Query,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [resolvers],
});
