import prisma from "../config/dbClient";

// Helper
export const EmptyDb = async () => {
	const user = await prisma.user.deleteMany();
	// const bsgt = await prisma.mainBudget.deleteMany();

	// return console.log(user);
	return 0;
};
