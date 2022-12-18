import { array, date, number, object, optional, string, TypeOf, z } from "zod";

const payload = {
	body: object({
		id_income: optional(
			string().min(20, { message: "income tidak valid" })
		),
		title: string().min(3, { message: "Minimal 3 karakter" }),
		budget: number().min(0),
		idMainBudget: optional(
			string().min(20, { message: "budget tidak valid" })
		),
		mainbudget: optional(object({})),
		create_at: optional(date()),
	}),
};

const params = {
	params: object({
		idMainBudget: string().min(20, { message: "budget tidak valid!" }),
		id_income: string().min(20, { message: "income tidak valid" }),
	}),
};

export const CreateIncomeSchema = object({
	params: object({
		idMainBudget: string().min(20, { message: "budget tidak valid!" }),
	}),
	...payload,
});

export const DeleteIncomeSchema = object({
	...params,
});

export const UpdateIncomeSchema = object({
	...params,
	...payload,
});

export const ViewIncomeSchema = object({
	params: object({
		idMainBudget: string().min(20, { message: "budget tidak valid!" }),
	}),
});

export type CreateIncomeType = TypeOf<typeof CreateIncomeSchema>;
export type DeleteIncomeType = TypeOf<typeof DeleteIncomeSchema>["params"];
export type UpdateIncomeType = TypeOf<typeof UpdateIncomeSchema>;
export type ViewIncomeType = TypeOf<typeof ViewIncomeSchema>["params"];
