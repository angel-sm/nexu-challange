import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import prisma from './prisma-client';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    model: {
      findMany: {
        mockResolvedValue: () => "hola"
      }
    },
  })),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
