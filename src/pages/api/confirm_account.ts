import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { getRedisClient } from '../../lib/redis';

const handleRedisQuery = async (
  redisResult: [error: Error | null, result: unknown][]
) => {
  if (redisResult[0][0]) {
    throw redisResult[0][0];
  }

  const cachedAccount = redisResult[0][1] as {
    username: string;
    email: string;
    hashedPassword: string;
  };

  if (
    !cachedAccount.username ||
    !cachedAccount.email ||
    !cachedAccount.hashedPassword
  ) {
    return;
  }

  console.log('Cached Account: ', cachedAccount);

  await prisma.user.create({
    data: {
      email: cachedAccount.email,
      username: cachedAccount.username,
      passhash: cachedAccount.hashedPassword
    }
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.id) {
    const key = req.query.id as string;
    const redisResult = await getRedisClient()
      .multi()
      .hgetall(key)
      .del(key)
      .exec();

    if (redisResult) handleRedisQuery(redisResult);
  }
  res.redirect(process.env.SERVER_URL ?? 'http://localhost:3000/login');
};

export default handler;
