import { object, string, TypeOf, optional } from "zod";

const payload = {
	body: object({
		_id_user: optional(string()),
		nama: string().min(6).max(16),
		email: string().email(),
		password: string().min(6).max(16),
		token: optional(string()),
	}),
};

export const RegisterUserSchema = object({
	...payload,
});

export type RegisterType = TypeOf<typeof RegisterUserSchema>["body"];
