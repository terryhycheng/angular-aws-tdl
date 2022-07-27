import express, { Request, Response } from "express";
import { toDo_routes } from "./toDo";
import { auth_routes } from "./user";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

toDo_routes(app);
auth_routes(app);

app.listen(5000, () => {
  console.log(`Server is running on port 5000!`);
});
