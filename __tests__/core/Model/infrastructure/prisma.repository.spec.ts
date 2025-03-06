import { PrismaRepository } from '../../../../src/core/Model/infrastructure/database/prisma.repository';

describe('PrismaRepository', () => {
  let prismaRepository: PrismaRepository;

  beforeEach(() => {
    prismaRepository = new PrismaRepository();
  });

  it('should retrieve brands correctly', async () => {
    const result = await prismaRepository.getBrands();
    expect(result.length).toBeGreaterThan(1);
  });
});
