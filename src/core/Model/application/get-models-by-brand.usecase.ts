import { UseCaseResponse } from '../../shared/interafaces';
import { PrimitiveModel } from '../domain/model.entity';
import { ModelRepository } from '../domain/model.repository';
import { DatabaseUnexpectedError, NotFoundError } from '../infrastructure/database/repository-errors';

export class GetModelsByBrandsUsecase {
  constructor(private repository: ModelRepository) {}

  async execute(
    brandId: number,
  ): Promise<UseCaseResponse<Omit<PrimitiveModel, 'brand_name'>[]>> {
    try {
      const data = await this.repository.getModelsByBrand(brandId);
      return {
        data,
        success: true,
        message: 'Models retrieved successfully',
      };
    } catch (error) {

      if (error instanceof NotFoundError) {
        return {
          data: [],
          success: false,
          message: error.message,
        };
      }

      if (error instanceof DatabaseUnexpectedError) {
        return {
          data: [],
          success: false,
          message: error.message,
        };
      }

      throw error
    }
  }
}
