import { ExpensePlan } from "@prisma/client";
import prisma from "../config/dbClient";
import {
	CreateExpensePlanType,
	DeleteExpensePlanType,
	UpdateExpensePlanType,
} from "../Types/ExpensePlan.type";
import { MainBudgetIdType } from "../Types/MainBudget.type";

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
			usage: 0,
		},
		include: {
			mainBudget: true,
		},
	});

	return respon;
};

export const DeleteExpensePlanService = async (
	params: DeleteExpensePlanType
) => {
	const respon = prisma.expensePlan.delete({
		where: {
			id_expensePlan: params.id_expensePlan,
		},
	});
	return respon;
};

export const UpdateExpensePlanService = async (
	params: UpdateExpensePlanType["params"],
	body: UpdateExpensePlanType["body"]
) => {
	const prevMainBudget = await prisma.mainBudget.findUnique({
		where: {
			id_main_budget: body.idMainBudget,
		},
		select: {
			maxBudget: true,
		},
	});

	if (prevMainBudget === null) {
		throw new Error("ada kesalahan pada budget!, silahkan ulangi");
	}

	if (body.maxExpense > prevMainBudget.maxBudget) {
		throw new Error(
			"Rencana pengeluaran lebih besar dari budget yang dimiliki!"
		);
	}

	const respon = await prisma.expensePlan.update({
		where: {
			id_expensePlan: params.id_expensePlan,
		},
		data: {
			idMainBudget: body.idMainBudget,
			title: body.title,
			maxExpense: body.maxExpense,
		},
	});

	return respon;
};

export const ViewExpensePlanService = async (id: MainBudgetIdType) => {
	const respon = await prisma.mainBudget.findUnique({
		where: {
			id_main_budget: id.id_main_budget,
		},
		include: {
			expensive: true,
		},
	});

	return respon;
};

export const FindExpensePlanService = async (
	id: DeleteExpensePlanType
): Promise<ExpensePlan | null> => {
	const respon = await prisma.expensePlan.findUnique({
		where: {
			id_expensePlan: id.id_expensePlan,
		},
	});

	return respon;
};
