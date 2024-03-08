import { Product as rawProduct } from '@prisma/client';
import { Product } from '@modules/products/application/entities/product.entity';

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDomain(raw: rawProduct): Product {
    return new Product(
      {
        name: raw.name,
        price: raw.price,
        quantity: raw.quantity,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
