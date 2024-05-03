"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="p-5">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-[0.385rem]">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* NOME DO PRODUTO */}
      <div className="mb-2 mt-1 text-xl font-semibold">{product.name}</div>

      {/* PREÇO DO PRODUTO E QUANTIDADE */}

      <div className="flex justify-between">
        {/* PREÇO COM DESC */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {/* PREÇO ORIGINAL */}

          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        {/* QUANTIDADE */}

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
          >
            <ChevronLeftIcon />
          </Button>
          1
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
