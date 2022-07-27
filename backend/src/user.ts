import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const salt: number = parseInt(process.env.SALT_ROUND as string);

interface DecodeObj {
  username: string;
  password: string;
}

export const auth_routes = (app: express.Application) => {
  app.post("/login", login);
  app.post("/auth", authCheck);
};

const login = async (req: Request, res: Response) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, salt);
    const data = { username: req.body.username, password: hash };
    const token = jwt.sign(data, process.env.TOKEN_SECRET!);
    res.status(200).send({ token: token });
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};

const authCheck = async (req: Request, res: Response) => {
  try {
    const decoded: DecodeObj = jwt_decode(req.body.token);
    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      decoded.password
    );
    // const data = { username: req.body.username, password: hash };
    res
      .status(200)
      .send({ decoded: decoded, isCorrectPassword: isCorrectPassword });
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};
