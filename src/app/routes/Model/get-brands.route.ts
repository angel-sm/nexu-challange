import { Express, Request, Response } from 'express';
import { GetBrandsUsecase } from '../../../core/Model/application/get-brands.usecase';
import { ModelRepository } from '../../../core/Model/domain/model.repository';

export class GetBrandsRoute {
  constructor(
    readonly app: Express,
    private readonly repository: ModelRepository,
  ) {}

  async route(path: string) {
    const usecase = new GetBrandsUsecase(this.repository);
    return this.app.get(path, async (req: Request, res: Response) => {
      try {
        const brands = await usecase.execute();
        res.status(200).json(brands);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  }
}
