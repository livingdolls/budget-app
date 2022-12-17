import express from "express";
import { RegisterUserController } from "../Controllers/Auth.controller";
import { SchemaValidator } from "../Middleware/Validator";
import { RegisterUserSchema } from "../Types/Auth.type";

const route = express.Router();

route.post(
	"/register",
	SchemaValidator(RegisterUserSchema),
	RegisterUserController
);

export default route;
