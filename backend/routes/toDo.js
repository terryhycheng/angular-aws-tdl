"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDo_routes = void 0;
const toDo_routes = (app) => {
    app.get("/todo", getAllToDos);
};
exports.toDo_routes = toDo_routes;
const getAllToDos = (req, res) => {
    res.status(200).send({ message: "Updated!" });
};
