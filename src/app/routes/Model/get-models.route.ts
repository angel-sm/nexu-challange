import { Express, Request, Response } from 'express';
import { ModelRepository } from '../../../core/Model/domain/model.repository';
import { GetModelsUsecase } from '../../../core/Model/application/get-models.usecase';
import { validateData } from '../../../infrastructure/middlewares/Model/get-models/validate-data.middleware';

export class GetModelssRoute {
  constructor(
    readonly app: Express,
    private readonly repository: ModelRepository,
  ) {}

  async route(path: string) {
    const usecase = new GetModelsUsecase(this.repository);
    return this.app.get(
      path,
      validateData,
      async (req: Request, res: Response) => {
        try {
          const filters = req.query;
          const brands = await usecase.execute(filters);
          res.status(200).json(brands);
        } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
        }
      },
    );
  }
}
