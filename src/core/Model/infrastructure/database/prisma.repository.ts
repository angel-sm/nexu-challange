import { PrismaFactory } from '../../../../infrastructure/database/prisma.factory';
import { Model, PrimitiveModel } from '../../domain/model.entity';
import { Filters, ModelRepository } from '../../domain/model.repository';
import { PrismaClient } from '@prisma/client';
import {
  DatabaseUnexpectedError,
  DuplicateEntryError,
  NotFoundError,
} from './repository-errors';

export class PrismaRepository extends ModelRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = PrismaFactory.client;
  }

  async getBrands(): Promise<Omit<PrimitiveModel, 'brand_name'>[]> {
    try {
      const brands = await this.prisma.model.findMany({
        select: {
          id: true,
          brand_name: true,
          average_price: true,
        },
      });

      if (!brands) {
        return []
      }

      return brands.map((brand) => ({
        id: brand.id,
        name: brand.brand_name,
        average_price: brand.average_price,
      })) as Omit<PrimitiveModel, 'brand_name'>[];
    } catch (error) {
      console.log("🚀 ~ PrismaRepository ~ getBrands ~ error:", error)
      throw new DatabaseUnexpectedError();
    }
  }

  async getModels(
    filters: Filters,
  ): Promise<Omit<PrimitiveModel, 'brand_name'>[]> {
    try {
      const where = {
        average_price: {},
      };

      const statement = {
        select: {
          id: true,
          name: true,
          average_price: true,
        },
      } as { where?: {}; select: any };

      if (filters.greater) {
        where['average_price'] = {
          gte: Number(filters.greater),
        };
        statement['where'] = where;
      }

      if (filters.lower) {
        where['average_price'] = {
          ...where['average_price'],
          lte: Number(filters.lower),
        };
        statement['where'] = where;
      }

      const models = await this.prisma.model.findMany(statement);

      return models as Omit<PrimitiveModel, 'brand_name'>[];
    } catch (error) {
      throw new DatabaseUnexpectedError();
    }
  }

  async getModelsByBrand(
    brandId: number,
  ): Promise<Omit<PrimitiveModel, 'brand_name'>[]> {
    try {
      const brand = await this.prisma.model.findUnique({
        where: { id: brandId },
        select: { brand_name: true },
      });

      if (!brand) {
        throw new NotFoundError('Brand');
      }

      const models = await this.prisma.model.findMany({
        where: {
          brand_name: brand.brand_name,
        },
        select: {
          id: true,
          name: true,
          average_price: true,
        },
      });

      return models as Omit<PrimitiveModel, 'brand_name'>[];
    } catch (error) {
      throw new DatabaseUnexpectedError();
    }
  }

  async createBrand(brand: Pick<Model, 'name'>): Promise<void> {
    try {
      const brands = await this.prisma.model.findMany({
        where: { brand_name: brand.name },
        select: {
          brand_name: true,
        },
      });

      if (brands.length > 0) {
        throw new DuplicateEntryError(`${brand.name}`);
      }

      await this.prisma.model.create({
        data: {
          brand_name: brand.name,
        },
      });
    } catch (error) {
      throw new DatabaseUnexpectedError();
    }
  }

  async createModel(
    model: Partial<Pick<Model, 'average_price'>> & Pick<Model, 'name' | 'id'>,
  ): Promise<void> {
    try {
      const brand = await this.prisma.model.findUnique({
        where: { id: model.id },
        select: { brand_name: true },
      });

      if (!brand) {
        throw new NotFoundError('Brand');
      }

      const allModels = await this.prisma.model.findMany({
        where: { brand_name: brand.brand_name },
        select: { name: true },
      });

      const modelExists = allModels.find((m) => m.name === model.name);

      if (modelExists) {
        throw new DuplicateEntryError(`${model.name}`);
      }

      await this.prisma.model.create({
        data: {
          name: model.name,
          brand_name: brand?.brand_name,
          average_price: model.average_price,
        },
      });
    } catch (error) {
      throw new DatabaseUnexpectedError();
    }
  }

  async updateModel(model: Pick<Model, 'average_price' | 'id'>): Promise<void> {
    try {
      await this.prisma.model.update({
        where: { id: Number(model.id) },
        data: {
          average_price: model.average_price,
        },
      });
    } catch (error) {
      throw new DatabaseUnexpectedError();
    }
  }
}
