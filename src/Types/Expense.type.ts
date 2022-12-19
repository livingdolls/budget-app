import { date, number, object, optional, string, TypeOf } from "zod";

const payload = {
	body: object({
		id_expense: optional(
			string().min(20, { message: "pengeluaran tidak valid!" })
		),
		title: string().min(3),
		budget: number(),
		idExpensePlan: string().min(20, {
			message: "rencana pengeluaran tidak valid!",
		}),
		expensePlan: optional(object({})),
		create_at: optional(date()),
	}),
};

const params = {
	params: object({
		id_expense: string().min(20, { message: "pengeluaran tidak valid!" }),
	}),
};

export const CreateExpenseSchema = object({
	...payload,
});

export const ExpenseIdSchema = object({
	...params,
});

export const UpdateExpenseSchema = object({
	...params,
	...payload,
});

export type CreateExpenseType = TypeOf<typeof CreateExpenseSchema>["body"];
export type ExpenseIdType = TypeOf<typeof ExpenseIdSchema>["params"];
export type UpdateExpenseType = TypeOf<typeof UpdateExpenseSchema>;
