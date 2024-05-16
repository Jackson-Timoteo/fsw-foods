import { Card, CardContent } from "@/app/_components/ui/card";
import { Order, OrderStatus, Prisma } from "@prisma/client";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: true;
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Entregue";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Pedido a Caminho ";
    case "PREPARING":
      return "Preparando";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="w-fit rounded-full bg-muted px-2 text-muted-foreground">
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
