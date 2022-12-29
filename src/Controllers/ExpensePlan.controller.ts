import { NextFunction, Request, Response } from "express";
import {
	CreateExpensePlanService,
	DeleteExpensePlanService,
	FindExpensePlanService,
	UpdateExpensePlanService,
} from "../Services/ExpensePlan.service";
import { ExpensePlanService } from "../Services/MainBudget.service";
import { ExpenseIdType } from "../Types/Expense.type";
import {
	CreateExpensePlanType,
	DeleteExpensePlanType,
	UpdateExpensePlanType,
} from "../Types/ExpensePlan.type";
import { MainBudgetType } from "../Types/MainBudget.type";
import { Respon } from "../Utils/Respon";

export const CreateExpensePlanController = async (
	req: Request<{}, {}, CreateExpensePlanType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await CreateExpensePlanService(req.body);
		Respon(
			201,
			true,
			respon,
			"berhasil menambah rencana pengeluaran!",
			res
		);
	} catch (error) {
		next(error);
	}
};

export const DeleteExpensePlanController = async (
	req: Request<DeleteExpensePlanType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await DeleteExpensePlanService(req.params);

		Respon(201, true, respon.title, "berhasil dihapus!", res);
	} catch (error) {
		next(error);
	}
};

export const UpdateExpenseController = async (
	req: Request<
		UpdateExpensePlanType["params"],
		{},
		UpdateExpensePlanType["body"]
	>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await UpdateExpensePlanService(req.params, req.body);
		Respon(201, true, respon.title, "berhasil diubah!", res);
	} catch (error) {
		next(error);
	}
};

export const ViewExpanseController = async (
	req: Request<Pick<MainBudgetType, "userId">>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await ExpensePlanService(req.params);
		Respon(
			200,
			true,
			respon,
			"berhasil menampilkan rencana pengeluaran!",
			res
		);
	} catch (error) {
		next(error);
	}
};

export const FindExpensePlanController = async (
	req: Request<DeleteExpensePlanType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await FindExpensePlanService(req.params);
		Respon(200, true, respon, "sukses mengambil expense plan", res);
	} catch (error: any) {
		next(error);
	}
};
