import { UseCaseResponse } from '../../shared/interafaces';
import { Model } from '../domain/model.entity';
import { ModelRepository } from '../domain/model.repository';
import { DatabaseUnexpectedError, DuplicateEntryError } from '../infrastructure/database/repository-errors';

interface Dto {
  brandId: number;
  name: string;
  average_price?: number;
}

export class CreateModelUsecase {
  constructor(private repository: ModelRepository) {}

  async execute(data: Dto): Promise<UseCaseResponse<null>> {
    try {
      const model = new Model({
        id: Number(data.brandId),
        name: data.name,
        average_price: data.average_price,
      });
      await this.repository.createModel(model);

      return {
        data: null,
        success: true,
        message: 'Model created successfully',
      };
    } catch (error) {
      if (error instanceof DuplicateEntryError) {
        return {
          data: null,
          success: false,
          message: error.message,
        };
      }

      if (error instanceof DatabaseUnexpectedError) {
        return {
          data: null,
          success: false,
          message: error.message,
        };
      }

      throw error 
    }
  }
}
