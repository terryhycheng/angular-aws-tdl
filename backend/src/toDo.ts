import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const toDo_routes = (app: express.Application) => {
  app.get("/todo", getAllToDos);
  app.post("/todo", createToDo);
  app.patch("/todo/:id", updateToDo);
  app.delete("/todo/:id", deleteToDo);
};

const prisma = new PrismaClient();

const getAllToDos = async (req: Request, res: Response) => {
  try {
    const toDos = await prisma.todo.findMany();
    res.status(200).send(toDos);
  } catch (error) {
    res.status(400).send({ message: `Can't get to-dos. ${error}` });
  }
};

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

const updateToDo = async (req: Request, res: Response) => {
  const toDoId: number = parseInt(req.params.id as string);
  try {
  } catch (error) {
    res
      .status(400)
      .send({ message: `Can't update to-do item (ID: ${toDoId}). ${error}` });
  }
};

const deleteToDo = async (req: Request, res: Response) => {
  const toDoId: number = parseInt(req.params.id as string);
  try {
  } catch (error) {
    res
      .status(400)
      .send({ message: `Can't delete to-do item (ID: ${toDoId}). ${error}` });
  }
};
