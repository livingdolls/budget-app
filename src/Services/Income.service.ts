import prisma from "../config/dbClient";
import { BudgetIncome } from "../interfaces/Income.interface";
import {
	CreateIncomeType,
	DeleteIncomeType,
	UpdateIncomeType,
	ViewIncomeType,
} from "../Types/Income.type";

export const CreateIncomeService = async (
	params: CreateIncomeType["params"],
	body: CreateIncomeType["body"]
): Promise<BudgetIncome> => {
	const prevBudget = await prisma.mainBudget.findUnique({
		where: {
			id_main_budget: params.idMainBudget,
		},
		select: {
			maxBudget: true,
		},
	});
	if (prevBudget === null) {
		throw new Error("budget tidak ditemukan!");
	}

	const respon = await prisma.mainBudget.update({
		where: {
			id_main_budget: params.idMainBudget,
		},
		data: {
			maxBudget: prevBudget.maxBudget + body.budget,
			income: {
				create: {
					title: body.title,
					budget: body.budget,
				},
			},
		},
		include: {
			income: true,
		},
	});
	return respon;
};

export const DeleteIncomeService = async (
	id: DeleteIncomeType
): Promise<BudgetIncome> => {
	const prevBudget = await prisma.mainBudget.findUnique({
		where: {
			id_main_budget: id.idMainBudget,
		},
		select: {
			maxBudget: true,
		},
	});

	if (prevBudget === null) {
		throw new Error("ada kesalahan pada budget, coba kembali!");
	}

	const prevIncome = await prisma.income.findUnique({
		where: {
			id_income: id.id_income,
		},
		select: {
			budget: true,
		},
	});

	if (prevIncome === null) {
		throw new Error("ada kesalahan pada income, coba kembali!");
	}

	const respon = await prisma.mainBudget.update({
		where: {
			id_main_budget: id.idMainBudget,
		},
		data: {
			maxBudget: prevBudget.maxBudget - prevIncome.budget,
			income: {
				delete: { id_income: id.id_income },
			},
		},
		include: {
			income: true,
		},
	});

	return respon;
};

export const UpdateIncomeService = async (
	params: UpdateIncomeType["params"],
	body: UpdateIncomeType["body"]
): Promise<BudgetIncome> => {
	const prevBudget = await prisma.mainBudget.findUnique({
		where: {
			id_main_budget: params.idMainBudget,
		},
		select: {
			maxBudget: true,
		},
	});

	if (prevBudget === null) {
		throw new Error("ada kesalahan pada budget, coba kembali!");
	}

	const prevIncome = await prisma.income.findUnique({
		where: {
			id_income: params.id_income,
		},
		select: {
			budget: true,
		},
	});

	if (prevIncome === null) {
		throw new Error("ada kesalahan pada income, coba kembali!");
	}

	const respon = await prisma.mainBudget.update({
		where: { id_main_budget: params.idMainBudget },
		data: {
			maxBudget: prevBudget.maxBudget - prevIncome.budget + body.budget,
			income: {
				update: {
					where: {
						id_income: params.id_income,
					},
					data: {
						title: body.title,
						budget: body.budget,
					},
				},
			},
		},
		include: {
			income: true,
		},
	});

	return respon;
};

export const ViewIncomeService = async (
	params: ViewIncomeType
): Promise<BudgetIncome | null> => {
	const respon = await prisma.mainBudget.findUnique({
		where: {
			id_main_budget: params.idMainBudget,
		},
		include: {
			income: true,
		},
	});

	return respon;
};
