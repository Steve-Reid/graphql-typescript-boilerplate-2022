import { PrismaClient } from '@prisma/client';
import { FieldResolver } from 'nexus';
import { ValidationError } from 'apollo-server-micro';
import { compare } from 'bcryptjs';
import nookies from 'nookies';
import { CookieSerializeOptions } from 'next/dist/server/web/types';
import { registrationValidation } from '../../utils/registrationValidation';
import { createToken } from '../../utils/jwt';

const getExistingUser = async (
  credentials: { email: string; password: string; username: string },
  prisma: PrismaClient
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      username: credentials.username,
      email: credentials.email
    },
    select: {
      username: true,
      passhash: true
    }
  });

  const passwordsMatch = await compare(
    credentials.password,
    (existingUser?.passhash as string) || ''
  );

  if (!existingUser || !passwordsMatch) {
    throw new Error('Invalid login credentials');
  }

  return existingUser;
};

export const loginAttempt: FieldResolver<'Mutation', 'login'> = async (
  _,
  { credentials },
  { res, prisma }
) => {
  await registrationValidation.validate(credentials);
  const existingUser = await getExistingUser(credentials, prisma);
  const tokenPayload = {
    username: credentials.username
  };

  const token = await createToken(tokenPayload, {
    expiresIn: '1m'
  });

  nookies.set({ res }, 'sid', token, {
    httpOnly: true,
    domain: process.env.SERVER_DOMAIN || undefined,
    maxAge: 60 * 5,
    sameSite: true,
    path: '/'
  } as CookieSerializeOptions);

  return {
    username: existingUser.username
  };
};
