import {PrismaClient} from '@/generated/prisma';

const globalFoPrisma = global as unknown as  {
    prisma: PrismaClient
};

const prisma = globalFoPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalFoPrisma.prisma = prisma;

export default prisma;