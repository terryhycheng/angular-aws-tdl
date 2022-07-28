import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const salt: number = parseInt(process.env.SALT_ROUND as string);

const prisma = new PrismaClient();

interface DecodeObj {
  username: string;
  password: string;
}

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
    if (isCorrectPassword) {
      const data = {
        username: username,
        email: user!.email,
      };
      const token = jwt.sign(data, process.env.TOKEN_SECRET!);
      res.status(200).send({ token: token });
    } else {
      throw new Error(`Wrong login credentials.`);
    }
  } catch (error) {
    res.status(401).send({ message: `${error}` });
  }
};

//Auth Check: return decoded message
const authCheck = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const decoded = jwt.decode(token);
    res.status(200).send(decoded);
  } catch (error) {
    res.status(401).send({ message: `${error}` });
  }
};

//Register: return JWT token
const register = async (req: Request, res: Response) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, salt);
    const data = {
      username: req.body.username,
      password: hash,
      email: req.body.email,
    };
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
      },
    });
    const token = jwt.sign(
      { username: data.username, email: data.email },
      process.env.TOKEN_SECRET!
    );
    res.status(200).send(token);
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};
