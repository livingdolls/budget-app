import express from "express";
import {
	CreateExpensePlanController,
	DeleteExpensePlanController,
	UpdateExpenseController,
	ViewExpanseController,
} from "../Controllers/ExpensePlan.controller";
import { VerifyToken } from "../Middleware/ValidasiToken";
import { VerifyUserExpensePlan } from "../Middleware/ValidasiUserBudget";
import { SchemaValidator } from "../Middleware/Validator";
import {
	CreateExpensePlanSchema,
	DeleteExpensePlanSchema,
	UpdateExpensePlanSchema,
} from "../Types/ExpensePlan.type";

const route = express.Router();

route.get("/:userId", ViewExpanseController);
route.post(
	"/",
	SchemaValidator(CreateExpensePlanSchema),
	CreateExpensePlanController
);

route.delete(
	"/:id_expensePlan",
	VerifyToken,
	VerifyUserExpensePlan,
	SchemaValidator(DeleteExpensePlanSchema),
	DeleteExpensePlanController
);

route.put(
	"/:id_expensePlan",
	VerifyToken,
	VerifyUserExpensePlan,
	SchemaValidator(UpdateExpensePlanSchema),
	UpdateExpenseController
);

export default route;
