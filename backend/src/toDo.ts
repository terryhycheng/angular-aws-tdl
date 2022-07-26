import express, { Request, Response } from "express";

export const toDo_routes = (app: express.Application) => {
  app.get("/todo", getAllToDos);
};

const getAllToDos = (req: Request, res: Response) => {
  res.status(200).send({ message: "Updated!" });
};
