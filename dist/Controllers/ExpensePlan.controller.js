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
exports.FindExpensePlanController = exports.ViewExpanseController = exports.UpdateExpenseController = exports.DeleteExpensePlanController = exports.CreateExpensePlanController = void 0;
const ExpensePlan_service_1 = require("../Services/ExpensePlan.service");
const MainBudget_service_1 = require("../Services/MainBudget.service");
const Respon_1 = require("../Utils/Respon");
const CreateExpensePlanController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, ExpensePlan_service_1.CreateExpensePlanService)(req.body);
        (0, Respon_1.Respon)(201, true, respon, "berhasil menambah rencana pengeluaran!", res);
    }
    catch (error) {
        next(error);
    }
});
exports.CreateExpensePlanController = CreateExpensePlanController;
const DeleteExpensePlanController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, ExpensePlan_service_1.DeleteExpensePlanService)(req.params);
        (0, Respon_1.Respon)(201, true, respon.title, "berhasil dihapus!", res);
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteExpensePlanController = DeleteExpensePlanController;
const UpdateExpenseController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, ExpensePlan_service_1.UpdateExpensePlanService)(req.params, req.body);
        (0, Respon_1.Respon)(201, true, respon.title, "berhasil diubah!", res);
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateExpenseController = UpdateExpenseController;
const ViewExpanseController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, MainBudget_service_1.ExpensePlanService)(req.params);
        (0, Respon_1.Respon)(200, true, respon, "berhasil menampilkan rencana pengeluaran!", res);
    }
    catch (error) {
        next(error);
    }
});
exports.ViewExpanseController = ViewExpanseController;
const FindExpensePlanController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, ExpensePlan_service_1.FindExpensePlanService)(req.params);
        (0, Respon_1.Respon)(200, true, respon, "sukses mengambil expense plan", res);
    }
    catch (error) {
        next(error);
    }
});
exports.FindExpensePlanController = FindExpensePlanController;
