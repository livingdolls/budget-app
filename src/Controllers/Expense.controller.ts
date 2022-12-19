import { NextFunction, Request, Response } from "express";
import {
	CreateExpenseService,
	DeleteExpenseService,
	UpdateExpenseService,
} from "../Services/Expense.service";
import {
	CreateExpenseType,
	ExpenseIdType,
	UpdateExpenseType,
} from "../Types/Expense.type";
import { Respon } from "../Utils/Respon";

export const CreateExpense = async (
	req: Request<{}, {}, CreateExpenseType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await CreateExpenseService(req.body);

		Respon(201, true, respon, "berhasil membuat pengeluaran!", res);
	} catch (error: any) {
		if (error.code === "P2025") {
			res.status(404);
		}
		next(error);
	}
};

export const DeleteExpense = async (
	req: Request<ExpenseIdType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await DeleteExpenseService(req.params);

		Respon(202, true, respon, "berhasil menghapus data", res);
	} catch (error) {
		next(error);
	}
};

export const UpdateExpense = async (
	req: Request<UpdateExpenseType["params"], {}, UpdateExpenseType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await UpdateExpenseService(req.params, req.body);

		Respon(200, true, respon, "berhasil merubah pengeluaran!", res);
	} catch (error) {
		next(error);
	}
};
