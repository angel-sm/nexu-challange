import { Express } from 'express';
import { GetBrandsRoute } from './get-brands.route';
import { PrismaRepository } from '../../../core/Model/infrastructure/database/prisma.repository';
import { GetModelsByBrandRoute } from './get-models-by-brands.route';
import { CreateBrandRoute } from './create-brand.route';
import { CreateModelRoute } from './create-model.route';
import { GetModelssRoute } from './get-models.route';
import { UpdateModelRoute } from './update-model.route';

export class ModelRoutes {
  private readonly repository: PrismaRepository;

  public static readonly GET_BRANDS = '/brands';
  public static readonly GET_MODELS = '/models';
  public static readonly GET_MODELS_BY_BRANDS = '/brands/:id/models';
  public static readonly CREATE_BRAND = '/brands';
  public static readonly CREATE_MODEL = '/brands/:id/models';
  public static readonly UPDATE_MODEL = '/models/:id';

  constructor(private app: Express) {
    this.repository = new PrismaRepository();
  }

  run() {
    new GetBrandsRoute(this.app, this.repository).route(ModelRoutes.GET_BRANDS);

    new GetModelssRoute(this.app, this.repository).route(
      ModelRoutes.GET_MODELS,
    );

    new GetModelsByBrandRoute(this.app, this.repository).route(
      ModelRoutes.GET_MODELS_BY_BRANDS,
    );

    new CreateBrandRoute(this.app, this.repository).route(
      ModelRoutes.CREATE_BRAND,
    );

    new CreateModelRoute(this.app, this.repository).route(
      ModelRoutes.CREATE_MODEL,
    );

    new UpdateModelRoute(this.app, this.repository).route(
      ModelRoutes.UPDATE_MODEL,
    );
  }
}
