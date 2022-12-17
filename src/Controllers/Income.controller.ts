import { NextFunction, Request, Response } from "express";
import { CreateIncomeService } from "../Services/Income.service";
import { CreateIncomeType } from "../Types/Income.type";
import { Respon } from "../Utils/Respon";

export const CreateIncomeController = async (
	req: Request<{}, {}, CreateIncomeType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await CreateIncomeService(req.body);

		return Respon(201, true, respon, "berhasil menambah income", res);
	} catch (error) {
		next(error);
	}
};
