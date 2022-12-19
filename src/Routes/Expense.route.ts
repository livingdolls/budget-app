import express from "express";
import {
	CreateExpense,
	DeleteExpense,
	UpdateExpense,
} from "../Controllers/Expense.controller";
import { SchemaValidator } from "../Middleware/Validator";
import {
	CreateExpenseSchema,
	ExpenseIdSchema,
	UpdateExpenseSchema,
} from "../Types/Expense.type";

const route = express.Router();

route.post("/", SchemaValidator(CreateExpenseSchema), CreateExpense);
route.delete("/:id_expense", SchemaValidator(ExpenseIdSchema), DeleteExpense);
route.put("/:id_expense", SchemaValidator(UpdateExpenseSchema), UpdateExpense);

export default route;
