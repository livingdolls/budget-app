import { Credential, Prisma, User } from "@prisma/client";

export type RegisterUser = Prisma.Prisma__UserClient<User, never>;
export type findUserCredential = {
	email: string;
	password: string;
	credential: Credential | null;
};
