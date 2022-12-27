import { NextFunction, Request, Response } from "express";
import { FindExpensePlanService } from "../Services/ExpensePlan.service";
import { FindMainBudgetByIdService } from "../Services/MainBudget.service";
import { DeleteExpensePlanType } from "../Types/ExpensePlan.type";
import { ViewIncomeType } from "../Types/Income.type";

export const VerifyUserBudget = async (
	req: Request<ViewIncomeType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const findBudget = await FindMainBudgetByIdService({
			userId: req.token.userId,
		});

		if (findBudget === null) throw Error("budget tidak ditemukan!");

		if (findBudget.id_main_budget !== req.params.idMainBudget)
			throw Error("akses dilarang");

		next();
	} catch (error) {
		next(error);
	}
};

export const VerifyUserExpensePlan = async (
	req: Request<DeleteExpensePlanType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const findBudget = await FindMainBudgetByIdService({
			userId: req.token.userId,
		});

		console.log(findBudget);

		const findExpensePlan = await FindExpensePlanService({
			id_expensePlan: req.params.id_expensePlan,
		});

		if (findBudget === null) throw Error("budget tidak ditemukan!");
		if (findExpensePlan === null)
			throw Error("expense plan tidak ditemukan!");

		if (findExpensePlan.idMainBudget !== findBudget.id_main_budget)
			throw Error("akses dilarang");

		next();
	} catch (error) {
		next(error);
	}
};
