import { Express, Request, Response } from 'express';
import { ModelRepository } from '../../../core/Model/domain/model.repository';
import { CreateModelUsecase } from '../../../core/Model/application/create-model.usecase';
import { validateData } from '../../../infrastructure/middlewares/Model/create-model/validate-data.middleware';
import { DuplicateEntryError } from '../../../core/Model/infrastructure/database/repository-errors';

export class CreateModelRoute {
  constructor(
    readonly app: Express,
    private readonly repository: ModelRepository,
  ) {}

  async route(path: string) {
    const usecase = new CreateModelUsecase(this.repository);

    return this.app.post(
      path,
      validateData,
      async (req: Request, res: Response) => {
        try {
          const body = req.body;
          const { id } = req.params;

          const response = await usecase.execute({
            ...body,
            brandId: id,
          });

          res.status(201).json(response);
        } catch (error: any) {
          if (error instanceof DuplicateEntryError) {
            res.status(400).json({ error: error.message });
            return;
          }

          res.status(500).json({ error: error.message });
        }
      },
    );
  }
}
