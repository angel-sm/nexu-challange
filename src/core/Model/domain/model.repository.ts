import { Model, PrimitiveModel } from './model.entity';

export interface Filters {
  greater?: number;
  lower?: number;
}

export abstract class ModelRepository {
  abstract getBrands(): Promise<Omit<PrimitiveModel, 'brand_name'>[]>;

  abstract getModels(filters: Filters): Promise<Omit<PrimitiveModel, 'brand_name'>[]>;

  abstract getModelsByBrand(
    brandId: number,
  ): Promise<Omit<PrimitiveModel, 'brand_name'>[]>;

  abstract createBrand(brand: Pick<Model, 'name'>): Promise<void>;

  abstract createModel(
    model: Partial<Pick<Model, 'average_price'>> & Pick<Model, 'name' | 'id'>,
  ): Promise<void>;

  abstract updateModel(
    model: Pick<Model, 'average_price' | 'id'>,
  ): Promise<void>;
}
