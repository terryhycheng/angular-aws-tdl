import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const toDo_routes = (app: express.Application) => {
  app.get("/todo/:id", getAllToDos);
  app.post("/todo", createToDo);
  app.patch("/todo/:id", updateToDo);
  app.delete("/todo/:id", deleteToDo);
};

const prisma = new PrismaClient();

//GET to-dos by user ID
const getAllToDos = async (req: Request, res: Response) => {
  try {
    const toDos = await prisma.todo.findMany({
      where: {
        usr_id: parseInt(req.params.id as string),
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).send(toDos);
  } catch (error) {
    res.status(400).send({ message: `Can't get to-dos. ${error}` });
  }
};

//Create Todo
const createToDo = async (req: Request, res: Response) => {
  try {
    const newToDo = await prisma.todo.create({
      data: {
        title: req.body.title as string,
        task: req.body.task as string,
        usr_id: parseInt(req.body.userId as string),
      },
    });
    res.status(200).send(newToDo);
  } catch (error) {
    res.status(400).send({ message: `Can't create a new to-do. ${error}` });
  }
};

//Update Todo
const updateToDo = async (req: Request, res: Response) => {
  const toDoId: number = parseInt(req.params.id as string);
  try {
    const updateTodo = await prisma.todo.update({
      where: {
        id: toDoId,
      },
      data: req.body,
    });
    res.status(200).send(updateTodo);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Can't update to-do item (ID: ${toDoId}). ${error}` });
  }
};

//Delete Todo
const deleteToDo = async (req: Request, res: Response) => {
  const toDoId: number = parseInt(req.params.id as string);
  try {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: toDoId,
      },
    });
    res.status(200).send(deleteTodo);
  } catch (error) {
    res
      .status(400)
      .send({ message: `Can't delete to-do item (ID: ${toDoId}). ${error}` });
  }
};
