import { useState } from 'react';
import Head from 'next/head';
import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  VStack
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ApolloError } from '@apollo/client';
import LoginInput from './LoginInput';
import StatusText from './StatusText';
import { useLoginMutation } from '../../../generated/graphql';

const LoginForm = () => {
  const router = useRouter();
  const [loginMutation] = useLoginMutation({
    notifyOnNetworkStatusChange: true
  });
  const [errMsg, setErrMsg] = useState<string | undefined>();

  return (
    <Container h="100vh">
      <Head>
        <title>Login</title>
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
          email: Yup.string()
            .required('Email is required')
            .email('Invalid email')
        })}
        onSubmit={async (values, actions) => {
          const creds = { ...values };
          actions.resetForm();
          try {
            const { data } = await loginMutation({
              variables: {
                credentials: {
                  email: creds.email,
                  username: creds.username,
                  password: creds.password
                }
              }
            });

            console.log('DATA: ', data?.login?.username);
            router.push('/');
          } catch (err) {
            setErrMsg((err as ApolloError).message);
          }
        }}
      >
        <VStack h="100%" justify="center">
          <VStack as={Form} shadow="2xl" w="100%" bg="gray.50" p="4">
            <Heading>Login</Heading>
            <StatusText errMsg={errMsg} />
            <LoginInput name="email" label="Email" />
            <LoginInput name="username" label="Username" />
            <LoginInput name="password" label="Password" type="password" />

            <ButtonGroup colorScheme="purple" w="100%" size="lg" pt="4">
              <Button
                w="100%"
                variant="outline"
                onClick={() => router.back()}
                leftIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <Button type="submit" w="100%">
                Login
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </Formik>
    </Container>
  );
};

export default LoginForm;
