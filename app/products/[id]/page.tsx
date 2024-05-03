import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-imagem";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      {/* IMAGEM */}
      <ProductImage product={product} />

      {/* TITULO E PREÇO */}
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
