"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toDo_1 = require("./toDo");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello from root!",
    });
});
(0, toDo_1.toDo_routes)(app);
app.listen(5000, () => {
    console.log(`Server is running on port 5000!`);
});