import { NextFunction, Request, Response } from "express";
import {
	CreateIncomeService,
	DeleteIncomeService,
	UpdateIncomeService,
	ViewIncomeService,
} from "../Services/Income.service";
import {
	CreateIncomeType,
	DeleteIncomeType,
	UpdateIncomeType,
	ViewIncomeType,
} from "../Types/Income.type";
import { Respon } from "../Utils/Respon";

export const CreateIncomeController = async (
	req: Request<UpdateIncomeType["params"], {}, UpdateIncomeType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await CreateIncomeService(req.params, req.body);

		return Respon(200, true, respon, "berhasil menambah income", res);
	} catch (error) {
		next(error);
	}
};

export const DeleteIncomeController = async (
	req: Request<DeleteIncomeType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await DeleteIncomeService(req.params);
		return Respon(200, true, respon, "berhasil menghapus income", res);
	} catch (error: any) {
		next(error);
	}
};

export const UpdateIncomeController = async (
	req: Request<UpdateIncomeType["params"], {}, UpdateIncomeType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await UpdateIncomeService(req.params, req.body);
		Respon(200, true, respon, "berhasil memperbaharui income", res);
	} catch (error) {
		next(error);
	}
};

export const ViewIncomeController = async (
	req: Request<ViewIncomeType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respon = await ViewIncomeService(req.params);

		Respon(200, true, respon, "berhasil mendapatkan data", res);
	} catch (error) {
		console.log(error);
	}
};
