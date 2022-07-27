"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.token_secret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.token_secret = process.env.TOKEN_SECRET;
const verifyAuthToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            exports.token_secret
                ? jsonwebtoken_1.default.verify(token, exports.token_secret)
                : new Error("Token secret is missing in environment.");
            next();
        }
        else {
            throw new Error("jwt must be provided.");
        }
    }
    catch (error) {
        res.status(401).send(`Access denied. Invalid token. ${error}`);
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;
