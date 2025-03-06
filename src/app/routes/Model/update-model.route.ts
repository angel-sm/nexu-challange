import { Express, Request, Response } from 'express';
import { ModelRepository } from '../../../core/Model/domain/model.repository';
import { UpdateModelUsecase } from '../../../core/Model/application/update-model.usecase';
import { validateData } from '../../../infrastructure/middlewares/Model/update-model/validate-data.middleware';

export class UpdateModelRoute {
  constructor(
    readonly app: Express,
    private readonly repository: ModelRepository,
  ) {}

  async route(path: string) {
    const usecase = new UpdateModelUsecase(this.repository);

    return this.app.put(
      path,
      validateData,
      async (req: Request, res: Response) => {
        try {
          const body = req.body;
          const { id } = req.params;
          const brands = await usecase.execute({
            id,
            ...body,
          });
          res.status(201).json(brands);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    );
  }
}
