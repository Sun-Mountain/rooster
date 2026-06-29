import db from "@/lib/prisma";

export const getStats = async (): Promise<{
  users: number;
  classes: number;
  sessions: number;
}> => {
  const totalUsers = await db.user.count();
  const totalClasses = await db.class.count();
  const totalTerms = await db.term.count();

  return {
    users: totalUsers,
    classes: totalClasses,
    sessions: totalTerms,
  };
};