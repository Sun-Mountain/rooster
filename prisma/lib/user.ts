import { db } from '@db/index';
import { Address, Phone, User, Prisma } from '@prisma/client';
import { createAddress, getAddress, updateAddress } from './address';
import { createPhone, getPhone, updatePhone } from './phone';

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

  return result as UserFull | null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: { email },
  });

  return user;
}

export const updateUser = async (id: string, data: Prisma.UserUpdateInput & { addressData?: { street?: string; street2?: string; city?: string; state?: string; zipCode?: string; country?: string } } & { phoneData?: { areaCode?: string; prefix?: string; lineNum?: string } }): Promise<User> => {
  console.log('Updating user with data:', data);

  const { addressData, phoneData, ...userData } = data;
  
  const userPhone = phoneData ? await getPhone(id) : null;
  const userAddress = addressData ? await getAddress(id) : null;

  if (addressData && !userAddress) {
    await createAddress(id, {
      street: addressData.street || '',
      street2: addressData.street2 || '',
      city: addressData.city || '',
      state: addressData.state || '',
      zipCode: addressData.zipCode || '',
      country: addressData.country || 'USA',
    });
  } else if (addressData && userAddress) {
    await updateAddress(id, {
      street: addressData.street,
      street2: addressData.street2,
      city: addressData.city,
      state: addressData.state,
      zipCode: addressData.zipCode,
      country: addressData.country,
    });
  }

  if (phoneData && !userPhone) {
    await createPhone(id, {
      areaCode: phoneData.areaCode || '',
      prefix: phoneData.prefix || '',
      lineNum: phoneData.lineNum || '',
    });
  } else if (phoneData && userPhone) {
      await updatePhone(id, {
        areaCode: phoneData.areaCode,
        prefix: phoneData.prefix,
        lineNum: phoneData.lineNum,
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