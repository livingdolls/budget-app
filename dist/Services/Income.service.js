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
exports.ViewIncomeService = exports.UpdateIncomeService = exports.DeleteIncomeService = exports.CreateIncomeService = void 0;
const dbClient_1 = __importDefault(require("../config/dbClient"));
const CreateIncomeService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    const prevBudget = yield dbClient_1.default.mainBudget.findUnique({
        where: {
            id_main_budget: params.idMainBudget,
        },
        select: {
            maxBudget: true,
        },
    });
    if (prevBudget === null) {
        throw new Error("budget tidak ditemukan!");
    }
    const respon = yield dbClient_1.default.mainBudget.update({
        where: {
            id_main_budget: params.idMainBudget,
        },
        data: {
            maxBudget: prevBudget.maxBudget + body.budget,
            income: {
                create: {
                    title: body.title,
                    budget: body.budget,
                },
            },
        },
        include: {
            income: true,
        },
    });
    return respon;
});
exports.CreateIncomeService = CreateIncomeService;
const DeleteIncomeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const prevBudget = yield dbClient_1.default.mainBudget.findUnique({
        where: {
            id_main_budget: id.idMainBudget,
        },
        select: {
            maxBudget: true,
        },
    });
    if (prevBudget === null) {
        throw new Error("ada kesalahan pada budget, coba kembali!");
    }
    const prevIncome = yield dbClient_1.default.income.findUnique({
        where: {
            id_income: id.id_income,
        },
        select: {
            budget: true,
        },
    });
    if (prevIncome === null) {
        throw new Error("ada kesalahan pada income, coba kembali!");
    }
    const maxExpense = yield dbClient_1.default.expensePlan.groupBy({
        by: ["idMainBudget"],
        where: {
            idMainBudget: id.idMainBudget,
        },
        _sum: {
            maxExpense: true,
        },
    });
    if (maxExpense.length !== 0) {
        if (maxExpense[0]._sum.maxExpense !== null) {
            if (maxExpense[0]._sum.maxExpense >
                prevBudget.maxBudget - prevIncome.budget) {
                throw Error("Mohon kurangi rencana pengeluaran untuk menghapus income yang dipilih!");
            }
        }
    }
    const respon = yield dbClient_1.default.mainBudget.update({
        where: {
            id_main_budget: id.idMainBudget,
        },
        data: {
            maxBudget: prevBudget.maxBudget - prevIncome.budget,
            income: {
                delete: { id_income: id.id_income },
            },
        },
        include: {
            income: true,
        },
    });
    return respon;
});
exports.DeleteIncomeService = DeleteIncomeService;
const UpdateIncomeService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    const prevBudget = yield dbClient_1.default.mainBudget.findUnique({
        where: {
            id_main_budget: params.idMainBudget,
        },
        select: {
            maxBudget: true,
        },
    });
    if (prevBudget === null) {
        throw new Error("ada kesalahan pada budget, coba kembali!");
    }
    const prevIncome = yield dbClient_1.default.income.findUnique({
        where: {
            id_income: params.id_income,
        },
        select: {
            budget: true,
        },
    });
    if (prevIncome === null) {
        throw new Error("ada kesalahan pada income, coba kembali!");
    }
    const respon = yield dbClient_1.default.mainBudget.update({
        where: { id_main_budget: params.idMainBudget },
        data: {
            maxBudget: prevBudget.maxBudget - prevIncome.budget + body.budget,
            income: {
                update: {
                    where: {
                        id_income: params.id_income,
                    },
                    data: {
                        title: body.title,
                        budget: body.budget,
                    },
                },
            },
        },
        include: {
            income: true,
        },
    });
    return respon;
});
exports.UpdateIncomeService = UpdateIncomeService;
const ViewIncomeService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.mainBudget.findUnique({
        where: {
            id_main_budget: params.idMainBudget,
        },
        include: {
            income: true,
        },
    });
    return respon;
});
exports.ViewIncomeService = ViewIncomeService;
