import { NextFunction, Request, Response } from "express";
import {
	CreateMainBudgetService,
	FindMainBudgetService,
} from "../Services/MainBudget.service";
import { MainBudgetType } from "../Types/MainBudget.type";
import { Respon } from "../Utils/Respon";

export const CreateMainBudgetController = async (
	req: Request<{}, {}, Pick<MainBudgetType, "userId">>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await CreateMainBudgetService(req.body);

		return Respon(201, true, respon, "berhasil membuat budget", res);
	} catch (error: any) {
		if (error.code === "P2002") {
			return Respon(409, false, [], "duplikat data", res);
		}

		next(error);
	}
};

export const FindMainBudgetController = async (
	req: Request<Pick<MainBudgetType, "userId">>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await FindMainBudgetService(req.params);

		if (respon === null) {
			return Respon(404, false, [], "budget tidak ditemukan!", res);
		}

		return Respon(200, true, respon, "success get data!", res);
	} catch (error) {
		next(error);
	}
};
