import { GraphQLContext } from "../context";
import { GraphQLYogaError } from "@graphql-yoga/node";

export const Query = {
  getProjects: async (
    parent: unknown,
    args: unknown,
    context: GraphQLContext
  ) => {
    try {
      if (!context.user) {
        throw new Error("You must be logged in to access this resource");
      }
      const projects = await context.prisma.project.findMany({
        where: { userId: context.user.userId },
        include: {
          stages: {
            include: {
              tasks: true,
            },
          },
        },
      });
      return projects;
    } catch (err) {
      throw new GraphQLYogaError((err as Error).message);
    }
  },
  getStages: (
    parent: unknown,
    args: { projectId: number },
    context: GraphQLContext
  ) => {
    try {
      if (!context.user) {
        throw new Error("You must be logged in to access this resource");
      }

      context.prisma.stage.findMany({
        where: { projectId: args.projectId },
        include: {
          tasks: true,
          prevStage: true,
        },
        orderBy: { createdAt: "asc" },
      });
    } catch (err) {
      throw new GraphQLYogaError((err as Error).message);
    }
  },
};
