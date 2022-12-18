import { NextFunction, Request, Response } from "express";
import {
	CreateExpensePlanService,
	DeleteExpensePlanService,
} from "../Services/ExpensePlan.service";
import {
	CreateExpensePlanType,
	DeleteExpensePlanType,
} from "../Types/ExpensePlan.type";
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log("apaps");
	} catch (error) {
		console.log(error);
	}
};
