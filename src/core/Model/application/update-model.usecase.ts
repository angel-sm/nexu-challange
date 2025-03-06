import { UseCaseResponse } from '../../shared/interafaces';
import { Model } from '../domain/model.entity';
import { ModelRepository } from '../domain/model.repository';
import { DatabaseUnexpectedError } from '../infrastructure/database/repository-errors';

interface dto {
  average_price: number;
  id: number;
}

export class UpdateModelUsecase {
  constructor(private repository: ModelRepository) {}

  async execute(data: dto): Promise<UseCaseResponse<null>> {
    try {
      const brand = new Model({
        id: data.id,
        average_price: data.average_price,
      });
      await this.repository.updateModel(brand);

      return {
        data: null,
        success: true,
        message: 'Model updated successfully',
      };
    } catch (error) {
      if (error instanceof DatabaseUnexpectedError) {
        return {
          data: null,
          success: false,
          message: error.message,
        };
      }
      throw error;
    }
  }
}
