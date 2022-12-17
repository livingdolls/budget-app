import { MainBudget } from "@prisma/client";
import prisma from "../config/dbClient";
import { CreateIncomeType } from "../Types/Income.type";

export const CreateIncomeService = async (
	datas: CreateIncomeType
): Promise<MainBudget> => {
	const prevBudget = await prisma.mainBudget.findUnique({
		where: {
			id_main_budget: datas.idMainBudget,
		},
		select: {
			maxBudget: true,
		},
	});

	const data = prevBudget?.maxBudget || 0;
	const total = data + datas.budget;

	const respon = await prisma.mainBudget.update({
		where: {
			id_main_budget: datas.idMainBudget,
		},
		data: {
			maxBudget: total,
			income: {
				create: {
					title: datas.title,
					budget: datas.budget,
				},
			},
		},
	});

	return respon;
};
