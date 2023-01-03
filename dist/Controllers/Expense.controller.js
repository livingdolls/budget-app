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
exports.ViewExpense = exports.UpdateExpense = exports.DeleteExpense = exports.CreateExpense = void 0;
const Expense_service_1 = require("../Services/Expense.service");
const Respon_1 = require("../Utils/Respon");
const CreateExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Expense_service_1.CreateExpenseService)(req.body);
        (0, Respon_1.Respon)(201, true, respon, "berhasil membuat pengeluaran!", res);
    }
    catch (error) {
        if (error.code === "P2025") {
            res.status(404);
        }
        next(error);
    }
});
exports.CreateExpense = CreateExpense;
const DeleteExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Expense_service_1.DeleteExpenseService)(req.params);
        (0, Respon_1.Respon)(202, true, respon, "berhasil menghapus data", res);
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteExpense = DeleteExpense;
const UpdateExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Expense_service_1.UpdateExpenseService)(req.params, req.body);
        (0, Respon_1.Respon)(200, true, respon, "berhasil merubah pengeluaran!", res);
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateExpense = UpdateExpense;
const ViewExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Expense_service_1.ViewExpenseService)(req.params);
        if (respon === null) {
            (0, Respon_1.Respon)(404, false, respon, "rencana pengeluaran tidak ditemukan!", res);
        }
        (0, Respon_1.Respon)(200, true, respon, "berhasil menampilkan pengeluaran!", res);
    }
    catch (error) {
        next(error);
    }
});
exports.ViewExpense = ViewExpense;
