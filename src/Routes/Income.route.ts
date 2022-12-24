import express from "express";
import {
	CreateIncomeController,
	DeleteIncomeController,
	UpdateIncomeController,
	ViewIncomeController,
} from "../Controllers/Income.controller";
import { VerifyToken } from "../Middleware/ValidasiToken";
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
	SchemaValidator(CreateIncomeSchema),
	CreateIncomeController
);
route.delete(
	"/budget/:idMainBudget/:id_income",
	SchemaValidator(DeleteIncomeSchema),
	DeleteIncomeController
);
route.put(
	"/budget/:idMainBudget/:id_income",
	SchemaValidator(UpdateIncomeSchema),
	UpdateIncomeController
);

route.get(
	"/budget/:idMainBudget",
	SchemaValidator(ViewIncomeSchema),
	ViewIncomeController
);

export default route;
