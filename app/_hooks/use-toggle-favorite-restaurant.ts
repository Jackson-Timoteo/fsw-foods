import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsCurrentyFavorite?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsCurrentyFavorite,
}: UseToggleFavoriteRestaurantProps) => {
  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      toast.success(
        restaurantIsCurrentyFavorite
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritadoo.",
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
