import { db } from '@db/index';
import { Address, Phone, User, Prisma } from '@prisma/client';
import { getAddress } from './address';
import { getPhone } from './phone';

interface UserFull extends Omit<User, 'password'> {
  address: Omit<Address, 'userId' | 'createdAt' | 'updatedAt'> | null;
  phone: Omit<Phone, 'userId' | 'createdAt' | 'updatedAt'> | null;
};

export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  const user =await db.user.create({
    data,
  });
  return user;
};

export const getUser = async ({email, id}: {email?: string, id?: string}): Promise<UserFull | null> => {
  const user = await db.user.findFirst({
    where: { OR: [{ email }, { id }] },
  });

  const address = user ? await getAddress(user.id) : null;
  const phoneNumber = user ? await getPhone(user.id) : null;

  const { password: _, ...userWithoutPassword } = user || {};

  const result = userWithoutPassword ? { ...userWithoutPassword, address, phoneNumber } : null;
  console.log(result);

  return result as UserFull | null;
};

export const updateUser = async (id: string, data: Prisma.UserUpdateInput & { phoneData?: { areaCode?: string; prefix?: string; lineNum?: string } }): Promise<User> => {
  console.log('Updating user with data:', data);

  const { phoneData, ...userData } = data;
  
  const userPhone = phoneData ? await getPhone(id) : null;

  if (phoneData && !userPhone) {
    await db.phone.create({
      data: {
        userId: id,
        areaCode: phoneData.areaCode || '',
        prefix: phoneData.prefix || '',
        lineNum: phoneData.lineNum || '',
      },
    });
  } else if (phoneData && userPhone) {
    await db.phone.update({
      where: { userId: id },
      data: {
        areaCode: phoneData.areaCode || userPhone.areaCode,
        prefix: phoneData.prefix || userPhone.prefix,
        lineNum: phoneData.lineNum || userPhone.lineNum,
      },
    });
  }

  const user = await db.user.update({
    where: { id },
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      updatedAt: new Date(),
    }
  });
  return user;
};