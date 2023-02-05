import { createSolidAPIHandler } from "solid-start-trpc";
import { initTRPC } from "@trpc/server";
import { createTask, deleteTask, findTasks } from "~/service/TaskService";
import { z } from "zod";

const t = initTRPC.create();
const appRouter = t.router({
  getTasks: t.procedure
    .input((date: unknown) => {
      if (typeof date === "string") return date;
      throw new Error();
    })
    .query((req) => {
      return findTasks(req.input);
    }),

  createTask: t.procedure
    .input(
      z.object({
        title: z.string(),
        details: z.string(),
        date: z.string(),
      }),
    )
    .mutation((req) => {
      return createTask(req.input);
    }),

  updateTask: t.procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        details: z.string(),
      }),
    )
    .mutation((req) => {
      return createTask(req.input);
    }),

  deleteTask: t.procedure
    .input((id: unknown) => {
      if (typeof id === "number") return id;
      throw new Error();
    })
    .mutation((req) => {
      deleteTask(req.input);
    }),
});

const handler = createSolidAPIHandler({
  router: appRouter,
  createContext: async () => null,
});

export const GET = handler;
export const POST = handler;

export type AppRouter = typeof appRouter;
