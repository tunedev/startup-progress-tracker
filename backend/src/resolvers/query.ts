import { GraphQLContext } from "../context";

export const Query = {
  getProjects: (
    parent: unknown,
    args: { userId: number },
    context: GraphQLContext
  ) =>
    context.prisma.project.findMany({
      where: { userId: args.userId },
      include: { stages: true },
    }),
  getStages: (
    parent: unknown,
    args: { projectId: number },
    context: GraphQLContext
  ) =>
    context.prisma.stage.findMany({
      where: { projectId: args.projectId },
      include: {
        tasks: true,
        prevStage: true,
      },
      orderBy: { createdAt: "asc" },
    }),
};
