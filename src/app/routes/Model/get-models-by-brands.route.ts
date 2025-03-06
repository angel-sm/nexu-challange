import { Express, Request, Response } from 'express';
import { ModelRepository } from '../../../core/Model/domain/model.repository';
import { GetModelsByBrandsUsecase } from '../../../core/Model/application/get-models-by-brand.usecase';
import { validateData } from '../../../infrastructure/middlewares/Model/get-models-by-brands/validate-data.middleware';
import { NotFoundError } from '../../../core/Model/infrastructure/database/repository-errors';

export class GetModelsByBrandRoute {
  constructor(
    readonly app: Express,
    private readonly repository: ModelRepository,
  ) {}

  async route(path: string) {
    const usecase = new GetModelsByBrandsUsecase(this.repository);

    return this.app.get(
      path,
      validateData,
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const models = await usecase.execute(Number(id));
          res.status(200).json(models);
        } catch (error: any) {
          
          if (error instanceof NotFoundError) {
            res.status(404).json({ error: error.message });
            return;
          }

          res.status(500).json({ error: error.message });
        }
      },
    );
  }
}
