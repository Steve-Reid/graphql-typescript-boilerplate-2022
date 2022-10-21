import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { createAccount } from '../resolvers/createAccount';
import { loginAttempt } from '../resolvers/loginAttempt';

const RegisterResponse = objectType({
  name: 'registerResponse',
  definition: t => {
    t.nonNull.string('message');
  }
});

const LoginResponse = objectType({
  name: 'loginResponse',
  definition: t => {
    t.string('username');
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

export const Login = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('login', {
      type: LoginResponse,
      args: { credentials: nonNull(Credentials) },
      resolve: loginAttempt
    });
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