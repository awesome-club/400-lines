import { PrismaClient, Task } from '@prisma/client'

const prisma = new PrismaClient();

export async function createTask(data: Partial<Task>) {
  return await prisma.task.create({
    data: {
      title: data.title ?? "",
      details: data.details ?? "",
      date: data.date ?? "",
      status: "todo"
    }
  })
}

export async function findTasks(date: string): Promise<Task[]> {
  return await prisma.task.findMany({
    where: {
      date: {
        equals: date
      }
    },
    orderBy: {
      id: "desc"
    }
  })
}

export async function updateTask(data: Partial<Task>) {
  return await prisma.task.update({
    where: {
      id: data.id!
    },
    data: {
      title: data.title ?? "",
      details: data.details ?? "",
    }
  });
}

export async function deleteTask(id: number) {
  await prisma.task.delete({
    where: { id },
  })
}