import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

export default client;
