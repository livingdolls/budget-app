"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExpensePlan_controller_1 = require("../Controllers/ExpensePlan.controller");
const ValidasiToken_1 = require("../Middleware/ValidasiToken");
const ValidasiUserBudget_1 = require("../Middleware/ValidasiUserBudget");
const Validator_1 = require("../Middleware/Validator");
const ExpensePlan_type_1 = require("../Types/ExpensePlan.type");
const route = express_1.default.Router();
route.get("/:userId", ExpensePlan_controller_1.ViewExpanseController);
route.post("/", ValidasiToken_1.VerifyToken, (0, Validator_1.SchemaValidator)(ExpensePlan_type_1.CreateExpensePlanSchema), ExpensePlan_controller_1.CreateExpensePlanController);
route.delete("/:id_expensePlan", ValidasiToken_1.VerifyToken, ValidasiUserBudget_1.VerifyUserExpensePlan, (0, Validator_1.SchemaValidator)(ExpensePlan_type_1.DeleteExpensePlanSchema), ExpensePlan_controller_1.DeleteExpensePlanController);
route.put("/:id_expensePlan", ValidasiToken_1.VerifyToken, ValidasiUserBudget_1.VerifyUserExpensePlan, (0, Validator_1.SchemaValidator)(ExpensePlan_type_1.UpdateExpensePlanSchema), ExpensePlan_controller_1.UpdateExpenseController);
route.get("/plan/:id_expensePlan", ValidasiToken_1.VerifyToken, ExpensePlan_controller_1.FindExpensePlanController);
exports.default = route;
