import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="container px-5 py-5">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex w-full flex-col gap-6">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="maxx-w-full min-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não marcou nenhum restaurante como Favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
