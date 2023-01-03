"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MainBudget_controller_1 = require("../Controllers/MainBudget.controller");
const ValidasiToken_1 = require("../Middleware/ValidasiToken");
const Validator_1 = require("../Middleware/Validator");
const MainBudget_type_1 = require("../Types/MainBudget.type");
const route = express_1.default.Router();
route.post("/", MainBudget_controller_1.CreateMainBudgetController);
route.get("/:userId", ValidasiToken_1.VerifyToken, MainBudget_controller_1.FindMainBudgetController);
route.delete("/:id_main_budget", (0, Validator_1.SchemaValidator)(MainBudget_type_1.MainBudgetIdSchema), MainBudget_controller_1.DeleteMainBudgetController);
exports.default = route;
