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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_service_1 = require("../Services/Auth.service");
const VerifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.sendStatus(401);
    // TODO
    try {
        const tokenValidate = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN || "supersecret");
        req.token = tokenValidate;
        next();
    }
    catch (error) {
        return res.sendStatus(403);
    }
};
exports.VerifyToken = VerifyToken;
const RefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.token_budget;
        if (!refreshToken)
            res.sendStatus(401);
        const findToken = yield (0, Auth_service_1.FindRefreshToken)(refreshToken);
        if (findToken === null) {
            res.sendStatus(401);
            throw Error("user tidak valid");
        }
        try {
            const refresh = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_JWT || "refreshsupersecret");
            const accessToken = jsonwebtoken_1.default.sign(findToken, process.env.JWT_TOKEN || "supersecret", { expiresIn: "25s", noTimestamp: true });
            res.json({ accessToken });
        }
        catch (error) {
            res.sendStatus(403);
        }
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.RefreshToken = RefreshToken;
