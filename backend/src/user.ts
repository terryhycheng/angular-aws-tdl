import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const salt: number = parseInt(process.env.SALT_ROUND as string);

const prisma = new PrismaClient();

export const auth_routes = (app: express.Application) => {
  app.post("/login", login);
  app.post("/auth", authCheck);
  app.post("/register", register);
};

//Login: return JWT token
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    const isCorrectPassword = user
      ? bcrypt.compareSync(password, user.password)
      : null;
    if (isCorrectPassword && user) {
      const data = {
        id: user.id,
        username: username,
        email: user.email,
      };
      const token = jwt.sign(data, process.env.TOKEN_SECRET as string);
      res.status(200).send({ token: token });
    } else {
      res.status(400).send({ message: `Wrong login credentials.` });
    }
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};

//Auth Check: return decoded message
const authCheck = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const decoded = jwt.decode(token);
    res.status(200).send(decoded);
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};

//Register: return JWT token
const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const hash = bcrypt.hashSync(password, salt);
    const data = {
      username: username,
      password: hash,
      email: email,
    };
    const newUser = await prisma.user.create({
      data: data,
    });
    if (newUser) {
      const token = jwt.sign(
        { id: newUser.id, username: data.username, email: data.email },
        process.env.TOKEN_SECRET as string
      );
      res.status(200).send({ token: token });
    } else {
      res.status(400).send({ message: `Cannot create user: ${newUser}` });
    }
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};
