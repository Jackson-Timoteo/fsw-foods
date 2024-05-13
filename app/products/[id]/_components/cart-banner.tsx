"use client";

import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice } = useContext(CartContext);

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId !== restaurant.id,
  );

  if (!restaurantHasProductsOnCart) return null;

  console.log({});

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-5 pt-3">
      <div className="flex items-center justify-between">
        {/* Preço */}
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}
            <span className="text-xs text-muted-foreground">
              / {products.length}
            </span>
          </h3>
        </div>
        {/* btn */}
      </div>
    </div>
  );
};

export default CartBanner;
