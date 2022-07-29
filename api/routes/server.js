"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toDo_1 = require("./toDo");
const user_1 = require("./user");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello from root!",
    });
});
(0, toDo_1.toDo_routes)(app);
(0, user_1.auth_routes)(app);
app.listen(5000, () => {
    console.log(`Server is running on port 5000!`);
});
