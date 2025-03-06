import { UseCaseResponse } from '../../shared/interafaces';
import { PrimitiveModel } from '../domain/model.entity';
import { ModelRepository } from '../domain/model.repository';
import { DatabaseUnexpectedError } from '../infrastructure/database/repository-errors';

export class GetBrandsUsecase {
  constructor(private repository: ModelRepository) {}

  async execute(): Promise<
    UseCaseResponse<Omit<PrimitiveModel, 'brand_name'>[]>
  > {
    try {
      const data = await this.repository.getBrands();
      return {
        data,
        success: true,
        message: 'Brands retrieved successfully',
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
