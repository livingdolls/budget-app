"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExpensePlanSchema = exports.DeleteExpensePlanSchema = exports.CreateExpensePlanSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        id_expensePlan: (0, zod_1.optional)((0, zod_1.string)().min(20, { message: "income tidak valid" })),
        title: (0, zod_1.string)().min(3, { message: "Minimal 3 karakter" }),
        maxExpense: (0, zod_1.number)().min(0),
        usage: (0, zod_1.optional)((0, zod_1.number)().min(0)),
        idMainBudget: (0, zod_1.string)().min(20, { message: "budget tidak valid!" }),
        mainbudget: (0, zod_1.optional)((0, zod_1.object)({})),
        create_at: (0, zod_1.optional)((0, zod_1.date)()),
    }),
};
const params = {
    params: (0, zod_1.object)({
        id_expensePlan: (0, zod_1.string)().min(20, {
            message: "rencana pengeluaran tidak valid",
        }),
    }),
};
exports.CreateExpensePlanSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.DeleteExpensePlanSchema = (0, zod_1.object)(Object.assign({}, params));
exports.UpdateExpensePlanSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), payload));
