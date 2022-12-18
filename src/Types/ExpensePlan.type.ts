import { date, number, object, optional, string, TypeOf } from "zod";

const payload = {
	body: object({
		id_expensePlan: optional(
			string().min(20, { message: "income tidak valid" })
		),
		title: string().min(3, { message: "Minimal 3 karakter" }),
		maxExpense: number().min(0),
		reminderBudget: optional(
			string().min(20, { message: "budget tidak valid" })
		),
		idMainBudget: string().min(20, { message: "budget tidak valid!" }),
		mainbudget: optional(object({})),
		create_at: optional(date()),
	}),
};

const params = {
	params: object({
		id_expensePlan: string().min(20, {
			message: "rencana pengeluaran tidak valid",
		}),
	}),
};

export const CreateExpensePlanSchema = object({
	...payload,
});

export const DeleteExpensePlanSchema = object({
	...params,
});

export type CreateExpensePlanType = TypeOf<
	typeof CreateExpensePlanSchema
>["body"];

export type DeleteExpensePlanType = TypeOf<
	typeof DeleteExpensePlanSchema
>["params"];
