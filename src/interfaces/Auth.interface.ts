import { Prisma, User } from "@prisma/client";

export type RegisterUser = Prisma.Prisma__UserClient<User, never>;
