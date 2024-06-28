import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { memo, useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CarItem = ({ cartProduct }: CartItemProps) => {
  const {
    descreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDescreaseQuantity = () =>
    descreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantity = () => increaseProductQuantity(cartProduct.id);

  const handleRemoveClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          {/* QUANTIDADE  */}

          <div className="flex items-center  text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon size={18} onClick={handleDescreaseQuantity} />
            </Button>

            <span className="block w-9 text-sm">{cartProduct.quantity}</span>

            <Button
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* BOTAO DE DEELTAR */}

      <Button
        size="icon"
        className="h-8 w-8 border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default memo(CarItem, (prev, next) => {
  return prev.cartProduct.quantity === next.cartProduct.quantity;
});
