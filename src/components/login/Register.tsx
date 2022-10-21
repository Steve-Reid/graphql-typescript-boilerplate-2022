import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  VStack
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import { ApolloError } from '@apollo/client';
import LoginInput from './LoginInput';
import { useRegisterAccountMutation } from '../../../generated/graphql';
import StatusText from './StatusText';

const Register = () => {
  const router = useRouter();
  const [registerMutation] = useRegisterAccountMutation({
    notifyOnNetworkStatusChange: true
  });
  const [errMsg, setErrMsg] = useState<string | undefined>();
  const [statusMsg, setStatusMsg] = useState<string | undefined>();

  return (
    <Container h="100vh">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirm: '' }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Username is required')
            .min(6, 'Username too short'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password too short'),
          confirm: Yup.string()
            .required('Passwords confirmation is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
          email: Yup.string()
            .required('Email is required')
            .email('Invalid email')
        })}
        onSubmit={async (values, actions) => {
          const creds = { ...values };
          actions.resetForm();
          try {
            const { data } = await registerMutation({
              variables: {
                credentials: {
                  email: creds.email,
                  username: creds.username,
                  password: creds.password
                }
              }
            });

            setStatusMsg(data?.createAccount?.message);
          } catch (err) {
            setErrMsg((err as ApolloError).message);
          }
        }}
      >
        <VStack h="100%" justify="center">
          <VStack as={Form} shadow="2xl" w="100%" bg="gray.50" p="4">
            <Heading>Register</Heading>
            <StatusText errMsg={errMsg} statusMsg={statusMsg} />
            <LoginInput name="email" label="Email" />
            <LoginInput name="username" label="Username" />
            <LoginInput name="password" label="Password" type="password" />
            <LoginInput
              name="confirm"
              label="Confirm Password"
              type="password"
            />
            <ButtonGroup colorScheme="purple" w="100%" size="lg" pt="4">
              <Button
                w="100%"
                variant="outline"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button type="submit" w="100%">
                Sign Up
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </Formik>
    </Container>
  );
};

export default Register;
