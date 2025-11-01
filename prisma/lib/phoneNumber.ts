import { db } from "@db/index";

export const getPhoneNumbersByUserId = async (userId: string) => {
  return db.phoneNumber.findUnique({
    where: { userId },
  });
};

export const updatePhoneNumberByUserId = async (userId: string, data: Partial<{ areaCode: string; numberGrp1: string; numberGrp2: string; }>) => {
  return db.phoneNumber.update({
    where: { userId },
    data,
  });
};

export const updatePhoneNumberByContactId = async (contactId: string, data: Partial<{ areaCode: string; numberGrp1: string; numberGrp2: string; }>) => {

  const phoneNumber = await db.phoneNumber.findUnique({
    where: { contactId },
  });

  if (!phoneNumber) {
    throw new Error(`Phone number not found for contactId: ${contactId}`);
  }

  const updatedPhoneNumber = await db.phoneNumber.update({
    where: { contactId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });

  return updatedPhoneNumber;
}
