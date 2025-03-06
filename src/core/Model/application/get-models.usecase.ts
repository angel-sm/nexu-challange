import { UseCaseResponse } from '../../shared/interafaces';
import { PrimitiveModel } from '../domain/model.entity';
import { Filters, ModelRepository } from '../domain/model.repository';
import { DatabaseUnexpectedError } from '../infrastructure/database/repository-errors';

export class GetModelsUsecase {
  constructor(private repository: ModelRepository) {}

  async execute(
    filters: Filters,
  ): Promise<UseCaseResponse<Omit<PrimitiveModel, 'brand_name'>[]>> {
    try {
      const data = await this.repository.getModels(filters);
      return {
        data,
        success: true,
        message: 'Models retrieved successfully',
      };
    } catch (error) {
      if (error instanceof DatabaseUnexpectedError) {
        return {
          data: [],
          success: false,
          message: error.message,
        };
      }

      throw error;
    }
  }
}
