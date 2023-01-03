"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewIncomeSchema = exports.UpdateIncomeSchema = exports.DeleteIncomeSchema = exports.CreateIncomeSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        id_income: (0, zod_1.optional)((0, zod_1.string)().min(20, { message: "income tidak valid" })),
        title: (0, zod_1.string)().min(3, { message: "Minimal 3 karakter" }),
        budget: (0, zod_1.number)().min(0),
        idMainBudget: (0, zod_1.optional)((0, zod_1.string)().min(20, { message: "budget tidak valid" })),
        mainbudget: (0, zod_1.optional)((0, zod_1.object)({})),
        create_at: (0, zod_1.optional)((0, zod_1.date)()),
    }),
};
const params = {
    params: (0, zod_1.object)({
        idMainBudget: (0, zod_1.string)().min(20, { message: "budget tidak valid!" }),
        id_income: (0, zod_1.string)().min(20, { message: "income tidak valid" }),
    }),
};
exports.CreateIncomeSchema = (0, zod_1.object)(Object.assign({ params: (0, zod_1.object)({
        idMainBudget: (0, zod_1.string)().min(20, { message: "budget tidak valid!" }),
    }) }, payload));
exports.DeleteIncomeSchema = (0, zod_1.object)(Object.assign({}, params));
exports.UpdateIncomeSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), payload));
exports.ViewIncomeSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        idMainBudget: (0, zod_1.string)().min(20, { message: "budget tidak valid!" }),
    }),
});
