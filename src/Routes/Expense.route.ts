import express from "express";
import {
	CreateExpense,
	DeleteExpense,
	UpdateExpense,
	ViewExpense,
} from "../Controllers/Expense.controller";
import { VerifyToken } from "../Middleware/ValidasiToken";
import { SchemaValidator } from "../Middleware/Validator";
import {
	CreateExpenseSchema,
	ExpenseIdSchema,
	UpdateExpenseSchema,
} from "../Types/Expense.type";

const route = express.Router();

route.post(
	"/",
	VerifyToken,
	SchemaValidator(CreateExpenseSchema),
	CreateExpense
);
route.delete(
	"/:id_expense",
	VerifyToken,
	SchemaValidator(ExpenseIdSchema),
	DeleteExpense
);
route.put(
	"/:id_expense",
	VerifyToken,
	SchemaValidator(UpdateExpenseSchema),
	UpdateExpense
);
route.get("/:id_expensePlan", VerifyToken, ViewExpense);

export default route;
