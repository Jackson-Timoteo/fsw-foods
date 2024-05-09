import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CarItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div>
      <div className="space-y-4">
        {products.map((product) => (
          <CarItem key={product.id} cartProduct={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
