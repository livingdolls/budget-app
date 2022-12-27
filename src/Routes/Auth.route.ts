import express from "express";
import {
	getUserController,
	helperDelete,
	LoginUserController,
	RegisterUserController,
} from "../Controllers/Auth.controller";
import { RefreshToken } from "../Middleware/ValidasiToken";
import { SchemaValidator } from "../Middleware/Validator";
import { LoginUserSchema, RegisterUserSchema } from "../Types/Auth.type";

const route = express.Router();

route.post(
	"/register",
	SchemaValidator(RegisterUserSchema),
	RegisterUserController
);

route.post("/login", SchemaValidator(LoginUserSchema), LoginUserController);
route.get("/refresh-token", RefreshToken);
route.get("/user-profile/:idUser", getUserController);

route.post("/empty", helperDelete);

export default route;
