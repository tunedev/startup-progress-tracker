import { PrismaClient } from "@prisma/client";
import { getUserByToken, createToken } from "./auth-utility";
import { User } from "./types";

const prisma = new PrismaClient();

export type GraphQLContext = {
  user: User | null;
  jwt: { createToken: (user: User) => string };
  prisma: PrismaClient;
};

export async function createContext({
  request,
}: {
  request: Request;
}): Promise<GraphQLContext> {
  const token = request.headers.get("authorization")?.replace(/Bearer /i, "");
  console.log(token);
  const user = token ? getUserByToken(token) : null;
  console.log(user);
  return {
    user,
    prisma,
    jwt: {
      createToken,
    },
  };
}
