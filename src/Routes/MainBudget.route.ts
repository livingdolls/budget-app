import express from "express";
import {
	CreateMainBudgetController,
	DeleteMainBudgetController,
	FindMainBudgetController,
} from "../Controllers/MainBudget.controller";
import { VerifyToken } from "../Middleware/ValidasiToken";
import { SchemaValidator } from "../Middleware/Validator";
import { MainBudgetIdSchema } from "../Types/MainBudget.type";

const route = express.Router();

route.post("/", CreateMainBudgetController);
route.get("/:userId", VerifyToken, FindMainBudgetController);
route.delete(
	"/:id_main_budget",
	SchemaValidator(MainBudgetIdSchema),
	DeleteMainBudgetController
);

export default route;
