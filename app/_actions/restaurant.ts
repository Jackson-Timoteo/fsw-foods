"use server";

import { db } from "../_lib/prisma";

export const favoriteRestaurant = (userId: string, restaurantId: string) => {
  return db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });
};
