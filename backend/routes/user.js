"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.auth_routes = void 0;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const salt = parseInt(process.env.SALT_ROUND);
const prisma = new client_1.PrismaClient();
const auth_routes = (app) => {
    app.post("/login", login);
    app.post("/auth", authCheck);
    app.post("/register", register);
};
exports.auth_routes = auth_routes;
//Login: return JWT token
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        const isCorrectPassword = user
            ? bcrypt.compareSync(password, user.password)
            : null;
        if (isCorrectPassword) {
            const data = {
                id: user.id,
                username: username,
                email: user.email,
            };
            const token = jwt.sign(data, process.env.TOKEN_SECRET);
            res.status(200).send({ token: token });
        }
        else {
            res.status(400).send({ message: `Wrong login credentials.` });
        }
    }
    catch (error) {
        res.status(400).send({ message: `${error}` });
    }
});
//Auth Check: return decoded message
const authCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const decoded = jwt.decode(token);
        res.status(200).send(decoded);
    }
    catch (error) {
        res.status(400).send({ message: `${error}` });
    }
});
//Register: return JWT token
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const hash = bcrypt.hashSync(password, salt);
        const data = {
            username: username,
            password: hash,
            email: email,
        };
        const newUser = yield prisma.user.create({
            data: data,
        });
        if (newUser) {
            const token = jwt.sign({ id: newUser.id, username: data.username, email: data.email }, process.env.TOKEN_SECRET);
            res.status(200).send({ token: token });
        }
        else {
            res.status(400).send({ message: `Cannot create user: ${newUser}` });
        }
    }
    catch (error) {
        res.status(400).send({ message: `${error}` });
    }
});
