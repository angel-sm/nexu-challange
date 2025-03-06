import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log('Seeding database...');
  const filePath = path.join(
    __dirname,
    '/mockData.json',
  );
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const models = JSON.parse(rawData);

  await prisma.model.createMany({
    data: models,
    skipDuplicates: true,
  });

  console.log('Seeding completed!');
}

seedDatabase()
  .catch((e) => console.error('Error seeding database:', e))
  .finally(async () => await prisma.$disconnect());
