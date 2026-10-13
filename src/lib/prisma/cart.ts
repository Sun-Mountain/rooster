import db from "@/lib/prisma";
import { Cart, Prisma } from "../../../generated/prisma/client";

type CartWithItems = Cart & { items: {
  lineItem: string;
  price: number
}[] };

// GET
export const getCartItemsByUserId = async (userId: string): Promise<CartWithItems | null> => {
  return await db.cart.findUnique({
    where: {
      userId: userId,
    },
    include: {
      items: true,
    },
  });
};

// POST
export const createCart = async (data: {userId: string}): Promise<Cart> => {
  return await db.cart.create(
    {
      data: {
        user: {
          connect: {
            id: data.userId
          }
        }
      }
    }
  );
};