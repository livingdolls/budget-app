import { array, date, number, object, optional, string, TypeOf, z } from "zod";

const payload = {
	body: object({
		id_income: optional(
			string().min(20, { message: "income tidak valid" })
		),
		title: string().min(3, { message: "Minimal 3 karakter" }),
		budget: number().min(0),
		idMainBudget: string().min(20, { message: "budget tidak valid" }),
		mainbudget: optional(object({})),
		create_at: optional(date()),
	}),
};

export const CreateIncomeSchema = object({
	...payload,
});

export type CreateIncomeType = TypeOf<typeof CreateIncomeSchema>["body"];
