import express from "express";
import {
	CreateIncomeController,
	DeleteIncomeController,
	UpdateIncomeController,
	ViewIncomeController,
} from "../Controllers/Income.controller";
import { VerifyToken } from "../Middleware/ValidasiToken";
import { VerifyUserBudget } from "../Middleware/ValidasiUserBudget";
import { SchemaValidator } from "../Middleware/Validator";
import {
	CreateIncomeSchema,
	DeleteIncomeSchema,
	UpdateIncomeSchema,
	ViewIncomeSchema,
} from "../Types/Income.type";

const route = express.Router();

route.post(
	"/budget/:idMainBudget",
	VerifyToken,
	VerifyUserBudget,
	SchemaValidator(CreateIncomeSchema),
	CreateIncomeController
);
route.delete(
	"/budget/:idMainBudget/:id_income",
	VerifyToken,
	VerifyUserBudget,
	SchemaValidator(DeleteIncomeSchema),
	DeleteIncomeController
);
route.put(
	"/budget/:idMainBudget/:id_income",
	VerifyToken,
	VerifyUserBudget,
	SchemaValidator(UpdateIncomeSchema),
	UpdateIncomeController
);

route.get(
	"/budget/:idMainBudget",
	VerifyToken,
	VerifyUserBudget,
	SchemaValidator(ViewIncomeSchema),
	ViewIncomeController
);

export default route;
