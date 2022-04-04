import { GraphQLYogaError } from "@graphql-yoga/node";
import bcrypt from "bcrypt";
import { GraphQLContext } from "../context";

export const Mutation = {
  signup: async (
    parent: unknown,
    args: { username: string; password: string },
    context: GraphQLContext
  ) => {
    try {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const userExit = await context.prisma.user.findUnique({
        where: {
          username: args.username,
        },
      });

      if (userExit) {
        throw new Error(`username: ${args.username} already exists`);
      }

      const newUser = await context.prisma.user.create({
        data: {
          username: args.username,
          password: hashedPassword,
        },
      });

      const token = context.jwt.createToken({
        userId: newUser.id,
        username: newUser.username,
      });

      return { ...newUser, password: null, token };
    } catch (err) {
      console.log("An Error occured: ", err);
      throw new GraphQLYogaError((err as Error).message);
    }
  },

  signin: async (
    parent: unknown,
    args: { username: string; password: string },
    context: GraphQLContext
  ) => {
    try {
      const user = await context.prisma.user.findUnique({
        where: {
          username: args.username,
        },
      });

      if (!user) {
        throw new Error("No user found");
      }

      const passwordValid = await bcrypt.compare(args.password, user.password);

      if (!passwordValid) {
        throw new Error("Invalid password");
      }

      const token = await context.jwt.createToken({
        userId: user.id,
        username: user.username,
      });

      const result = { ...user, password: null, token };

      return result;
    } catch (err) {
      throw new GraphQLYogaError((err as Error).message);
    }
  },

  createProject: async (
    root: unknown,
    args: { name: string; description?: string },
    context: GraphQLContext
  ) => {
    try {
      if (!context.user) {
        throw new Error("You must be logged in to create a project");
      }

      const project = await context.prisma.project.create({
        data: {
          name: args.name,
          description: args.description,
          userId: context.user ? context.user.userId : 1,
        },
        include: {
          user: true,
        },
      });

      return project;
    } catch (err) {
      console.log("An Error occured: ", err);
      throw new GraphQLYogaError((err as Error).message);
    }
  },
  createStage: async (
    root: unknown,
    args: { name: string; projectId: number; description?: string },
    context: GraphQLContext
  ) => {
    try {
      if (!context.user) {
        throw new Error("You must be logged in to create a project's stage");
      }

      const isUsersProject =
        (
          await context.prisma.project.findUnique({
            where: {
              id: args.projectId,
            },
          })
        )?.userId === context.user.userId;

      if (!isUsersProject) {
        throw new Error("You are not the owner of this project");
      }

      const previousStages = await context.prisma.stage.findFirst({
        where: { projectId: args.projectId },
        orderBy: { createdAt: "desc" },
      });

      const stage = await context.prisma.stage.create({
        data: {
          name: args.name,
          description: args.description,
          projectId: args.projectId,
          prevStageId: previousStages?.id,
        },
        include: {
          project: true,
          prevStage: true,
        },
      });

      return stage;
    } catch (err) {
      throw new GraphQLYogaError((err as Error).message);
    }
  },

  createTask: async (
    root: unknown,
    args: { stageId: number; name: string; description?: string },
    context: GraphQLContext
  ) => {
    try {
      if (!context.user) {
        throw new Error("You must be logged in to create a Task");
      }
      const task = await context.prisma.task.create({
        data: {
          name: args.name,
          description: args.description,
          stageId: args.stageId,
        },
      });

      return task;
    } catch (err) {
      throw new GraphQLYogaError((err as Error).message);
    }
  },

  toggleTaskStatus: async (
    root: unknown,
    args: { taskId: number },
    context: GraphQLContext
  ) => {
    try {
      if (!context.user) {
        throw new Error("You must be logged in to create a Task");
      }

      const task = await context.prisma.task.findUnique({
        where: { id: args.taskId },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      const parentStage = await context.prisma.stage.findUnique({
        where: { id: task.stageId },
        include: { tasks: true, prevStage: true },
      });

      if (!parentStage) {
        throw new Error("Parent stage not found");
      }

      if (!parentStage.prevStage || parentStage.prevStage.allTaskDone) {
        // Root Stage or prev stage tasks all completed update with no qualms
        const updatedTask = await context.prisma.task.update({
          where: { id: task.id },
          data: { done: !task.done },
          include: { stage: true },
        });
        await context.prisma.stage.update({
          where: { id: parentStage.id },
          data: {
            allTaskDone: (
              await context.prisma.task.findMany({
                where: { stageId: parentStage.id },
              })
            ).every((task) => task.done === true),
          },
        });
        return updatedTask;
      } else if (!parentStage.prevStage.allTaskDone) {
        throw new Error(
          "Ensure all tasks on previous Stage has been completed: You cannot toggle the done property of this stage, because the previous stage is not done"
        );
      }
    } catch (err) {
      throw new GraphQLYogaError((err as Error).message);
    }
  },
};
