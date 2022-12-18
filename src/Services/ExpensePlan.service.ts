import { ExpensePlan } from "@prisma/client";
import prisma from "../config/dbClient";
import {
	CreateExpensePlanType,
	DeleteExpensePlanType,
} from "../Types/ExpensePlan.type";

export const CreateExpensePlanService = async (
	data: CreateExpensePlanType
): Promise<ExpensePlan> => {
	const prevMainBudget = await prisma.mainBudget.findUnique({
		where: {
			id_main_budget: data.idMainBudget,
		},
		select: {
			maxBudget: true,
		},
	});

	if (prevMainBudget === null) {
		throw new Error("ada kesalahan pada budget!, silahkan ulangi");
	}

	if (data.maxExpense > prevMainBudget.maxBudget) {
		throw new Error(
			"Rencana pengeluaran lebih besar dari budget yang dimiliki!"
		);
	}

	const respon = await prisma.expensePlan.create({
		data: {
			idMainBudget: data.idMainBudget,
			title: data.title,
			maxExpense: data.maxExpense,
			remainderBudget: data.maxExpense,
		},
		include: {
			mainBudget: true,
		},
	});

	return respon;
};

export const DeleteExpensePlanService = (params: DeleteExpensePlanType) => {
	const respon = prisma.expensePlan.delete({
		where: {
			id_expensePlan: params.id_expensePlan,
		},
	});

	return respon;
};
