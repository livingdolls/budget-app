"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_controller_1 = require("../Controllers/Auth.controller");
const ValidasiToken_1 = require("../Middleware/ValidasiToken");
const Validator_1 = require("../Middleware/Validator");
const Auth_type_1 = require("../Types/Auth.type");
const route = express_1.default.Router();
route.post("/register", (0, Validator_1.SchemaValidator)(Auth_type_1.RegisterUserSchema), Auth_controller_1.RegisterUserController);
route.post("/login", (0, Validator_1.SchemaValidator)(Auth_type_1.LoginUserSchema), Auth_controller_1.LoginUserController);
route.get("/refresh-token", ValidasiToken_1.RefreshToken);
route.get("/user-profile/:idUser", Auth_controller_1.getUserController);
route.post("/empty", Auth_controller_1.helperDelete);
exports.default = route;
