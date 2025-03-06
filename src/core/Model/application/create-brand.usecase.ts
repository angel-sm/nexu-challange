import { UseCaseResponse } from '../../shared/interafaces';
import { Model } from '../domain/model.entity';
import { ModelRepository } from '../domain/model.repository';
import {
  DatabaseUnexpectedError,
  DuplicateEntryError,
} from '../infrastructure/database/repository-errors';

interface dto {
  name: string;
}

export class CreateBrandUsecase {
  constructor(private repository: ModelRepository) {}

  async execute(newBrand: dto): Promise<UseCaseResponse<null>> {
    try {
      const brand = new Model({
        name: newBrand.name,
      });
      await this.repository.createBrand(brand);
      return {
        data: null,
        success: true,
        message: 'Brand created successfully',
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

      throw error;
    }
  }
}
