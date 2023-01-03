"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Income_controller_1 = require("../Controllers/Income.controller");
const ValidasiToken_1 = require("../Middleware/ValidasiToken");
const ValidasiUserBudget_1 = require("../Middleware/ValidasiUserBudget");
const Validator_1 = require("../Middleware/Validator");
const Income_type_1 = require("../Types/Income.type");
const route = express_1.default.Router();
route.post("/budget/:idMainBudget", ValidasiToken_1.VerifyToken, ValidasiUserBudget_1.VerifyUserBudget, (0, Validator_1.SchemaValidator)(Income_type_1.CreateIncomeSchema), Income_controller_1.CreateIncomeController);
route.delete("/budget/:idMainBudget/:id_income", ValidasiToken_1.VerifyToken, ValidasiUserBudget_1.VerifyUserBudget, (0, Validator_1.SchemaValidator)(Income_type_1.DeleteIncomeSchema), Income_controller_1.DeleteIncomeController);
route.put("/budget/:idMainBudget/:id_income", ValidasiToken_1.VerifyToken, ValidasiUserBudget_1.VerifyUserBudget, (0, Validator_1.SchemaValidator)(Income_type_1.UpdateIncomeSchema), Income_controller_1.UpdateIncomeController);
route.get("/budget/:idMainBudget", ValidasiToken_1.VerifyToken, ValidasiUserBudget_1.VerifyUserBudget, (0, Validator_1.SchemaValidator)(Income_type_1.ViewIncomeSchema), Income_controller_1.ViewIncomeController);
exports.default = route;
