import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { createAccount } from '../resolvers/createAccount';

const RegisterResponse = objectType({
  name: 'registerResponse',
  definition: t => {
    t.nonNull.string('message');
    t.nonNull.boolean('error');
  }
});

const Credentials = inputObjectType({
  name: 'loginCredentials',
  definition: t => {
    t.nonNull.string('email');
    t.nonNull.string('username');
    t.nonNull.string('password');
  }
});

export const CreateAccount = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('createAccount', {
      type: RegisterResponse,
      args: { credentials: nonNull(Credentials) },
      resolve: createAccount
    });
  }
});
