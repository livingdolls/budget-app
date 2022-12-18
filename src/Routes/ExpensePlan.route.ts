import express from "express";
import {
	CreateExpensePlanController,
	DeleteExpensePlanController,
	UpdateExpenseController,
	ViewExpanseController,
} from "../Controllers/ExpensePlan.controller";
import { SchemaValidator } from "../Middleware/Validator";
import {
	CreateExpensePlanSchema,
	DeleteExpensePlanSchema,
	UpdateExpensePlanSchema,
} from "../Types/ExpensePlan.type";

const route = express.Router();

route.get("/:id_main_budget", ViewExpanseController);
route.post(
	"/",
	SchemaValidator(CreateExpensePlanSchema),
	CreateExpensePlanController
);

route.delete(
	"/:id_expensePlan",
	SchemaValidator(DeleteExpensePlanSchema),
	DeleteExpensePlanController
);

route.put(
	"/:id_expensePlan",
	SchemaValidator(UpdateExpensePlanSchema),
	UpdateExpenseController
);

export default route;
