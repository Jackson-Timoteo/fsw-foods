import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CarItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);
  return (
    <div className="flex h-full flex-col py-5">
      <div className="flex-auto space-y-4">
        {products.map((product) => (
          <CarItem key={product.id} cartProduct={product} />
        ))}
      </div>

      {/* TOTAL */}

      {products.length > 0 && (
        <>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-fofregund">Subtotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm">
                  <span className=" text-muted-foreground"> Descontos</span>
                  <span> - {formatCurrency(totalDiscounts)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm">
                  <span className=" text-muted-foreground">Entrega</span>

                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="font-semibold uppercase text-primary">
                      Grátis
                    </span>
                  ) : (
                    formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total:</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>

                <Separator />
              </CardContent>
            </Card>
          </div>

          {/* Finalizar pedido */}
          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      )}
    </div>
  );
};

export default Cart;
