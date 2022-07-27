"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDo_routes = void 0;
const client_1 = require("@prisma/client");
const toDo_routes = (app) => {
    app.get("/todo", getAllToDos);
    app.post("/todo", createToDo);
    app.patch("/todo/:id", updateToDo);
    app.delete("/todo/:id", deleteToDo);
};
exports.toDo_routes = toDo_routes;
const prisma = new client_1.PrismaClient();
const getAllToDos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDos = yield prisma.todo.findMany();
        res.status(200).send(toDos);
    }
    catch (error) {
        res.status(400).send({ message: `Can't get to-dos. ${error}` });
    }
});
const createToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newToDo = yield prisma.todo.create({
            data: {
                title: req.body.title,
                task: req.body.task,
                usr_id: parseInt(req.body.userId),
            },
        });
        res.status(200).send(newToDo);
    }
    catch (error) {
        res.status(400).send({ message: `Can't create a new to-do. ${error}` });
    }
});
const updateToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toDoId = parseInt(req.params.id);
    try {
    }
    catch (error) {
        res
            .status(400)
            .send({ message: `Can't update to-do item (ID: ${toDoId}). ${error}` });
    }
});
const deleteToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toDoId = parseInt(req.params.id);
    try {
    }
    catch (error) {
        res
            .status(400)
            .send({ message: `Can't delete to-do item (ID: ${toDoId}). ${error}` });
    }
});
