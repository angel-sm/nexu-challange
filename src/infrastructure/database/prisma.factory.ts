import { PrismaClient } from '@prisma/client';

export class PrismaFactory {
  private static instance: PrismaClient;

  static get client(): PrismaClient {
    if (!this.instance) {
      this.instance = new PrismaClient();
    }
    return this.instance;
  }
}
