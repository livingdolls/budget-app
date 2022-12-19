import prisma from "../config/dbClient";
import { ExpenseEx } from "../interfaces/Expense.interface";
import {
	CreateExpenseType,
	ExpenseIdType,
	UpdateExpenseType,
} from "../Types/Expense.type";
import { DeleteExpensePlanType } from "../Types/ExpensePlan.type";

export const CreateExpenseService = async (
	data: CreateExpenseType
): Promise<ExpenseEx> => {
	const prevExpansePlan = await prisma.expensePlan.findUnique({
		where: {
			id_expensePlan: data.idExpensePlan,
		},
		select: {
			maxExpense: true,
			usage: true,
		},
	});

	if (prevExpansePlan === null) {
		throw new Error("rencana pengeluaran tidak valid");
	}

	const newExpanse = prevExpansePlan.usage + data.budget;

	if (newExpanse > prevExpansePlan.maxExpense) {
		throw new Error("pengeluaran melebihi rencana pengeluaran!");
	}

	const respon = await prisma.expensePlan.update({
		where: {
			id_expensePlan: data.idExpensePlan,
		},
		data: {
			usage: newExpanse,
			Expense: {
				create: {
					title: data.title,
					budget: data.budget,
				},
			},
		},
		include: {
			Expense: true,
		},
	});

	return respon;
};

export const DeleteExpenseService = async (
	id: ExpenseIdType
): Promise<ExpenseEx> => {
	const expense = await prisma.expense.findUnique({
		where: {
			id_expense: id.id_expense,
		},
		select: {
			idExpensePlan: true,
			budget: true,
		},
	});

	if (expense === null) {
		throw new Error("pengeluaran tidak valid!");
	}

	const prevExpansePlan = await prisma.expensePlan.findUnique({
		where: {
			id_expensePlan: expense.idExpensePlan,
		},
		select: {
			usage: true,
		},
	});

	if (prevExpansePlan === null) {
		throw new Error("rencana pengeluaran tidak valid!");
	}

	const respon = await prisma.expensePlan.update({
		where: {
			id_expensePlan: expense.idExpensePlan,
		},
		data: {
			usage: prevExpansePlan.usage - expense.budget,
			Expense: {
				delete: { id_expense: id.id_expense },
			},
		},
		include: {
			Expense: true,
		},
	});

	return respon;
};

export const UpdateExpenseService = async (
	params: UpdateExpenseType["params"],
	body: UpdateExpenseType["body"]
): Promise<ExpenseEx> => {
	const prevExpense = await prisma.expense.findUnique({
		where: {
			id_expense: params.id_expense,
		},
		select: {
			idExpensePlan: true,
			budget: true,
		},
	});

	if (prevExpense === null) {
		throw new Error("rencana pengeluaran tidak valid");
	}

	const prevExpensePlan = await prisma.expensePlan.findUnique({
		where: {
			id_expensePlan: prevExpense.idExpensePlan,
		},
		select: {
			usage: true,
			maxExpense: true,
		},
	});

	if (prevExpensePlan === null) {
		throw new Error("pengeluaran tidak valid");
	}

	if (
		prevExpensePlan.usage - prevExpense.budget + body.budget >
		prevExpensePlan.maxExpense
	) {
		throw new Error("pengeluaran melebihi rencana pengeluaran");
	}

	const respon = await prisma.expensePlan.update({
		where: {
			id_expensePlan: prevExpense.idExpensePlan,
		},
		data: {
			usage: prevExpensePlan.usage - prevExpense.budget + body.budget,
			Expense: {
				update: {
					where: { id_expense: params.id_expense },
					data: {
						title: body.title,
						budget: body.budget,
					},
				},
			},
		},
		include: {
			Expense: true,
		},
	});

	return respon;
};

export const ViewExpenseService = async (
	params: DeleteExpensePlanType
): Promise<ExpenseEx | null> => {
	const respon = await prisma.expensePlan.findUnique({
		where: {
			id_expensePlan: params.id_expensePlan,
		},
		include: {
			Expense: true,
		},
	});

	return respon;
};
