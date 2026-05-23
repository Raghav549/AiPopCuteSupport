import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'demo@aipop.app' },
    update: {},
    create: {
      email: 'demo@aipop.app',
      username: 'demo',
      password: 'demo1234',
      profile: { create: { name: 'Demo User', bio: 'Seed user' } },
    },
  });
}

main().finally(() => prisma.$disconnect());
