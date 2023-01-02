import { object, string, TypeOf, optional } from "zod";

const payload = {
	body: object({
		_id_user: optional(string()),
		nama: string().min(6, { message: "Karakter minimal 6 huruf" }).max(16),
		email: string().email(),
		password: string()
			.min(6, { message: "Karakter minimal 6 huruf" })
			.max(16),
	}),
};

export const RegisterUserSchema = object({
	...payload,
});

export const LoginUserSchema = object({
	body: object({
		email: string().email(),
		password: string().min(6).max(16),
	}),
});

export type RegisterType = TypeOf<typeof RegisterUserSchema>["body"];
export type LoginType = TypeOf<typeof LoginUserSchema>["body"];
