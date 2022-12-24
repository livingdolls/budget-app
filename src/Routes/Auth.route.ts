import express from "express";
import {
	helperDelete,
	LoginUserController,
	RegisterUserController,
} from "../Controllers/Auth.controller";
import { SchemaValidator } from "../Middleware/Validator";
import { LoginUserSchema, RegisterUserSchema } from "../Types/Auth.type";

const route = express.Router();

route.post(
	"/register",
	SchemaValidator(RegisterUserSchema),
	RegisterUserController
);

route.post("/login", SchemaValidator(LoginUserSchema), LoginUserController);

route.post("/empty", helperDelete);

export default route;
