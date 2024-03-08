import { Product } from '@modules/products/application/entities/product.entity';
import { ProductRepositoryInterface } from '@modules/products/application/repositories/product-repository.interface';
import { PrismaService } from '../prisma.service';
import { PrismaProductMapper } from '../mappers/prisma-product.mapper';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductPrismaRepository implements ProductRepositoryInterface {
  constructor(private prisma: PrismaService) {}
  async find(id: string): Promise<Product | undefined> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
    if (product) return PrismaProductMapper.toDomain(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({});
    return products.map(PrismaProductMapper.toDomain);
  }
  async create(product: Product): Promise<void> {
    const rawProduct = PrismaProductMapper.toPrisma(product);
    await this.prisma.product.create({
      data: rawProduct,
    });
  }
  async save(product: Product): Promise<void> {
    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: product.quantity,
      },
    });
  }
}
