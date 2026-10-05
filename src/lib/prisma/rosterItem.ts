import db from "@/lib/prisma";
import { RosterItem, Prisma } from "@client";

// Create a new roster entry in the database
export const createRosterEntry = async (data: Prisma.RosterItemCreateInput): Promise<RosterItem> => {
  return await db.rosterItem.create({
    data,
  });
};

// Get a list of all roster entries
export const getAllRosterEntries = async (): Promise<RosterItem[]> => {
  return await db.rosterItem.findMany();
};

// Get roster entry by a specified roster entry id
export const getRosterEntryById = async (id: string): Promise<RosterItem | null> => {
  return await db.rosterItem.findUnique({
    where: { id },
  });
};

// Get roster entries by a specified class id
export const getRosterByClassId = async (classId: string): Promise<RosterItem[]> => {
  return await db.rosterItem.findMany({
    where: { classTermRosterId: classId },
  });
}

//Get roster entries by a specified user id
export const getRosterEntriesByUserId = async (userId: string): Promise<RosterItem[]> => {
  return await db.rosterItem.findMany({
    where: { userId },
  });
};

export const getCurrentRosterDetailsByUserId = async (userId: string) => {
  const rosterEntries = await db.rosterItem.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (rosterEntries.length === 0) return [];

  const classDetails = await db.classTermDetails.findMany({
    where: {
      id: { in: rosterEntries.map((entry) => entry.classTermRosterId) },
      term: {
        status: "LIVE",
      },
    },
    include: {
      class: {
        select: {
          name: true,
          description: true,
        },
      },
      term: {
        select: {
          name: true,
          startDate: true,
          endDate: true,
        },
      },
      classInstances: true,
      location: {
        select: {
          name: true,
        },
      },
    },
  });

  const detailsById = new Map(classDetails.map((detail) => [detail.id, detail]));

  return rosterEntries
    .map((entry) => ({ rosterEntryId: entry.id, classDetails: detailsById.get(entry.classTermRosterId) }))
    .filter((entry) => entry.classDetails !== undefined);
};

// Update info for a single roster entry based on a roster entry id. The roster entry id will remain the same but all other fields may be changed
export const updateRosterEntryById = async (rosterEntryId: string, data: Prisma.RosterItemUpdateInput): Promise<RosterItem> => {
  return await db.rosterItem.update({
    where: {
      id: rosterEntryId,
    },
    data,
  });
};

// Delete a roster entry by its id
export const deleteRosterEntryById = async (id: string): Promise<RosterItem> => {
  return await db.rosterItem.delete({
    where: { id },
  });
};

export const deleteRosterEntriesByUserAndClass = async (userId: string, classId: string): Promise<void> => {
  await db.rosterItem.deleteMany({
    where: {
      userId,
      classTermRosterId: classId,
    },
  });
};