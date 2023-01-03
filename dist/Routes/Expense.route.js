"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Expense_controller_1 = require("../Controllers/Expense.controller");
const ValidasiToken_1 = require("../Middleware/ValidasiToken");
const Validator_1 = require("../Middleware/Validator");
const Expense_type_1 = require("../Types/Expense.type");
const route = express_1.default.Router();
route.post("/", ValidasiToken_1.VerifyToken, (0, Validator_1.SchemaValidator)(Expense_type_1.CreateExpenseSchema), Expense_controller_1.CreateExpense);
route.delete("/:id_expense", ValidasiToken_1.VerifyToken, (0, Validator_1.SchemaValidator)(Expense_type_1.ExpenseIdSchema), Expense_controller_1.DeleteExpense);
route.put("/:id_expense", ValidasiToken_1.VerifyToken, (0, Validator_1.SchemaValidator)(Expense_type_1.UpdateExpenseSchema), Expense_controller_1.UpdateExpense);
route.get("/:id_expensePlan", ValidasiToken_1.VerifyToken, Expense_controller_1.ViewExpense);
exports.default = route;
