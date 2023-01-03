"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExpenseSchema = exports.ExpenseIdSchema = exports.CreateExpenseSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        id_expense: (0, zod_1.optional)((0, zod_1.string)().min(20, { message: "pengeluaran tidak valid!" })),
        title: (0, zod_1.string)().min(3),
        budget: (0, zod_1.number)(),
        idExpensePlan: (0, zod_1.string)().min(20, {
            message: "rencana pengeluaran tidak valid!",
        }),
        expensePlan: (0, zod_1.optional)((0, zod_1.object)({})),
        create_at: (0, zod_1.optional)((0, zod_1.date)()),
    }),
};
const params = {
    params: (0, zod_1.object)({
        id_expense: (0, zod_1.string)().min(20, { message: "pengeluaran tidak valid!" }),
    }),
};
exports.CreateExpenseSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.ExpenseIdSchema = (0, zod_1.object)(Object.assign({}, params));
exports.UpdateExpenseSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), payload));
