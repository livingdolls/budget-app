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
exports.ViewExpenseService = exports.UpdateExpenseService = exports.DeleteExpenseService = exports.CreateExpenseService = void 0;
const dbClient_1 = __importDefault(require("../config/dbClient"));
const CreateExpenseService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const prevExpansePlan = yield dbClient_1.default.expensePlan.findUnique({
        where: {
            id_expensePlan: data.idExpensePlan,
        },
        select: {
            maxExpense: true,
            usage: true,
        },
    });
    if (prevExpansePlan === null) {
        throw new Error("rencana pengeluaran tidak valid");
    }
    const newExpanse = prevExpansePlan.usage + data.budget;
    if (newExpanse > prevExpansePlan.maxExpense) {
        throw new Error("pengeluaran melebihi rencana pengeluaran!");
    }
    const respon = yield dbClient_1.default.expensePlan.update({
        where: {
            id_expensePlan: data.idExpensePlan,
        },
        data: {
            usage: newExpanse,
            Expense: {
                create: {
                    title: data.title,
                    budget: data.budget,
                },
            },
        },
        include: {
            Expense: true,
        },
    });
    return respon;
});
exports.CreateExpenseService = CreateExpenseService;
const DeleteExpenseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = yield dbClient_1.default.expense.findUnique({
        where: {
            id_expense: id.id_expense,
        },
        select: {
            idExpensePlan: true,
            budget: true,
        },
    });
    if (expense === null) {
        throw new Error("pengeluaran tidak valid!");
    }
    const prevExpansePlan = yield dbClient_1.default.expensePlan.findUnique({
        where: {
            id_expensePlan: expense.idExpensePlan,
        },
        select: {
            usage: true,
        },
    });
    if (prevExpansePlan === null) {
        throw new Error("rencana pengeluaran tidak valid!");
    }
    const respon = yield dbClient_1.default.expensePlan.update({
        where: {
            id_expensePlan: expense.idExpensePlan,
        },
        data: {
            usage: prevExpansePlan.usage - expense.budget,
            Expense: {
                delete: { id_expense: id.id_expense },
            },
        },
        include: {
            Expense: true,
        },
    });
    return respon;
});
exports.DeleteExpenseService = DeleteExpenseService;
const UpdateExpenseService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    const prevExpense = yield dbClient_1.default.expense.findUnique({
        where: {
            id_expense: params.id_expense,
        },
        select: {
            idExpensePlan: true,
            budget: true,
        },
    });
    if (prevExpense === null) {
        throw new Error("rencana pengeluaran tidak valid");
    }
    const prevExpensePlan = yield dbClient_1.default.expensePlan.findUnique({
        where: {
            id_expensePlan: prevExpense.idExpensePlan,
        },
        select: {
            usage: true,
            maxExpense: true,
        },
    });
    if (prevExpensePlan === null) {
        throw new Error("pengeluaran tidak valid");
    }
    if (prevExpensePlan.usage - prevExpense.budget + body.budget >
        prevExpensePlan.maxExpense) {
        throw new Error("pengeluaran melebihi rencana pengeluaran");
    }
    const respon = yield dbClient_1.default.expensePlan.update({
        where: {
            id_expensePlan: prevExpense.idExpensePlan,
        },
        data: {
            usage: prevExpensePlan.usage - prevExpense.budget + body.budget,
            Expense: {
                update: {
                    where: { id_expense: params.id_expense },
                    data: {
                        title: body.title,
                        budget: body.budget,
                    },
                },
            },
        },
        include: {
            Expense: true,
        },
    });
    return respon;
});
exports.UpdateExpenseService = UpdateExpenseService;
const ViewExpenseService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.expensePlan.findUnique({
        where: {
            id_expensePlan: params.id_expensePlan,
        },
        include: {
            Expense: true,
        },
    });
    return respon;
});
exports.ViewExpenseService = ViewExpenseService;
