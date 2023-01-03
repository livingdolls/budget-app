"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyUserExpensePlan = exports.VerifyUserBudget = void 0;
const ExpensePlan_service_1 = require("../Services/ExpensePlan.service");
const MainBudget_service_1 = require("../Services/MainBudget.service");
const VerifyUserBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findBudget = yield (0, MainBudget_service_1.FindMainBudgetByIdService)({
            userId: req.token.userId,
        });
        if (findBudget === null)
            throw Error("budget tidak ditemukan!");
        if (findBudget.id_main_budget !== req.params.idMainBudget)
            throw Error("akses dilarang");
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.VerifyUserBudget = VerifyUserBudget;
const VerifyUserExpensePlan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findBudget = yield (0, MainBudget_service_1.FindMainBudgetByIdService)({
            userId: req.token.userId,
        });
        const findExpensePlan = yield (0, ExpensePlan_service_1.FindExpensePlanService)({
            id_expensePlan: req.params.id_expensePlan,
        });
        if (findBudget === null)
            throw Error("budget tidak ditemukan!");
        if (findExpensePlan === null)
            throw Error("expense plan tidak ditemukan!");
        if (findExpensePlan.idMainBudget !== findBudget.id_main_budget)
            throw Error("akses dilarang");
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.VerifyUserExpensePlan = VerifyUserExpensePlan;
