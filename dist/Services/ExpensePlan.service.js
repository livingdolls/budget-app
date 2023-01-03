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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindExpensePlanService = exports.UpdateExpensePlanService = exports.DeleteExpensePlanService = exports.CreateExpensePlanService = void 0;
const dbClient_1 = __importDefault(require("../config/dbClient"));
const CreateExpensePlanService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const prevMainBudget = yield dbClient_1.default.mainBudget.findUnique({
        where: {
            id_main_budget: data.idMainBudget,
        },
        select: {
            maxBudget: true,
        },
    });
    if (prevMainBudget === null) {
        throw new Error("ada kesalahan pada budget!, silahkan ulangi");
    }
    if (data.maxExpense > prevMainBudget.maxBudget) {
        throw new Error("Rencana pengeluaran lebih besar dari budget yang dimiliki!");
    }
    const respon = yield dbClient_1.default.expensePlan.create({
        data: {
            idMainBudget: data.idMainBudget,
            title: data.title,
            maxExpense: data.maxExpense,
            usage: 0,
        },
        include: {
            mainBudget: true,
        },
    });
    return respon;
});
exports.CreateExpensePlanService = CreateExpensePlanService;
const DeleteExpensePlanService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = dbClient_1.default.expensePlan.delete({
        where: {
            id_expensePlan: params.id_expensePlan,
        },
    });
    return respon;
});
exports.DeleteExpensePlanService = DeleteExpensePlanService;
const UpdateExpensePlanService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    const prevMainBudget = yield dbClient_1.default.mainBudget.findUnique({
        where: {
            id_main_budget: body.idMainBudget,
        },
        select: {
            maxBudget: true,
        },
    });
    if (prevMainBudget === null) {
        throw new Error("ada kesalahan pada budget!, silahkan ulangi");
    }
    if (body.maxExpense > prevMainBudget.maxBudget) {
        throw new Error("Rencana pengeluaran lebih besar dari budget yang dimiliki!");
    }
    const respon = yield dbClient_1.default.expensePlan.update({
        where: {
            id_expensePlan: params.id_expensePlan,
        },
        data: {
            idMainBudget: body.idMainBudget,
            title: body.title,
            maxExpense: body.maxExpense,
        },
    });
    return respon;
});
exports.UpdateExpensePlanService = UpdateExpensePlanService;
const FindExpensePlanService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.expensePlan.findUnique({
        where: {
            id_expensePlan: id.id_expensePlan,
        },
        include: {
            Expense: true,
        },
    });
    return respon;
});
exports.FindExpensePlanService = FindExpensePlanService;
