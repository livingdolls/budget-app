import express from "express";
import {
	helperDelete,
	RegisterUserController,
} from "../Controllers/Auth.controller";
import { SchemaValidator } from "../Middleware/Validator";
import { RegisterUserSchema } from "../Types/Auth.type";

const route = express.Router();

route.post(
	"/register",
	SchemaValidator(RegisterUserSchema),
	RegisterUserController
);

route.post("/empty", helperDelete);

export default route;
