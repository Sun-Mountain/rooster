import db from "@/lib/prisma";

export const getStats = async (): Promise<{
  users: number;
  classes: number;
  liveSessions: number;
  totalSessions: number;
}> => {
  const totalUsers = await db.user.count();
  const totalClasses = await db.class.count();
  const liveTerms = await db.term.findMany({
    where: {
      status: "LIVE",
    }
  });
  const totalTerms = await db.term.count();

  return {
    users: totalUsers,
    classes: totalClasses,
    liveSessions: liveTerms.length,
    totalSessions: totalTerms,
  };
};