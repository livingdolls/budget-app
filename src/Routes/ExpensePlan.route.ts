import express from "express";
import {
	CreateExpensePlanController,
	DeleteExpensePlanController,
	UpdateExpenseController,
} from "../Controllers/ExpensePlan.controller";
import { SchemaValidator } from "../Middleware/Validator";
import {
	CreateExpensePlanSchema,
	DeleteExpensePlanSchema,
} from "../Types/ExpensePlan.type";

const route = express.Router();

// route.get("/", CreateExpensePlanController);
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

route.put("/:id_expensePlan", UpdateExpenseController);

export default route;
