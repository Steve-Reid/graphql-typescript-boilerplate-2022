import { FieldResolver } from 'nexus';
import * as Yup from 'yup';
import { hash } from 'bcryptjs';
import nodemailer from 'nodemailer';
import { getTransport } from '../../mail/transport';
import { generateVerificationEmail } from '../../mail/verifyAccount';
import { registrationValidation } from '../../utils/registrationValidation';
import { getRedisClient } from '../../../lib/redis';

// CommonJS format is needed here for type generation to work properly
const { v4: uuid } = require('uuid');

export const createAccount: FieldResolver<'Mutation', 'createAccount'> = async (
  _,
  { credentials },
  { prisma }
) => {
  try {
    await registrationValidation.validate(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: credentials.username,
        OR: { email: credentials.email }
      }
    });
    if (existingUser !== null) {
      throw new Error('Email or username already exists!');
    }

    const hashedPassword = await hash(credentials.password, 8);

    const key = uuid();
    const userObj = {
      username: credentials.username,
      email: credentials.email,
      hashedPassword
    };

    await getRedisClient()
      .multi()
      .hmset(key, userObj)
      .expire(key, 60 * 2)
      .exec();

    const transport = await getTransport();
    const mailOptions = generateVerificationEmail({
      username: credentials.username,
      email: credentials.email,
      uuid: key
    });

    transport.sendMail(mailOptions).then(info => {
      console.log(`Message id: ${info.messageId}`);
      console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`);
    });

    return {
      message:
        'Thanks for registering! Check your email for instructions on how to verify your account.',
      error: false
    };
  } catch (err) {
    const message = (err as Yup.ValidationError).message || 'Invalid Input';

    return {
      message,
      error: true
    };
  }
};
