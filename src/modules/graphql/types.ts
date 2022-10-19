import { booleanArg, extendType, nonNull } from 'nexus';

export const testQuery = extendType({
  type: 'Query',
  definition: t => {
    t.boolean('test', {
      args: { bool: nonNull(booleanArg()) },
      resolve: async (_, { bool }, { prisma }) => {
        const users = await prisma.user.findMany();
        console.log('🚀 ~ file: types.ts ~ line 10 ~ resolve: ~ users', users);
        return bool;
      }
    });
  }
});
