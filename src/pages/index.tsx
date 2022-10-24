import type { GetServerSidePropsContext, NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import nookies from 'nookies';
import {
  ImplicitLoginDocument,
  ImplicitLoginQuery
} from '../../generated/graphql';
import { initializeApollo } from '../lib/apolloClient';
import { prisma } from '../lib/prisma';
import Register from '../components/login/Register';

interface HomeProps {
  username: string;
  loggedIn: boolean;
}

const Home: NextPage<HomeProps> = ({ loggedIn, username }) =>
  loggedIn ? <Heading>Welcome {username}</Heading> : <Register />;

export const getServerSideProps = async ({
  req,
  res
}: GetServerSidePropsContext) => {
  const cookies = nookies.get({ req });
  if (!cookies.sid) {
    return {
      props: { loggedIn: false } as HomeProps
    };
  }

  const apolloClient = initializeApollo({
    ctx: { req, res, prisma }
  });

  const { data } = await apolloClient.query<ImplicitLoginQuery>({
    query: ImplicitLoginDocument
  });

  console.log('DATA: ', data);

  if (!data.implicitLogin?.loggedIn) {
    return { props: { loggedIn: false } as HomeProps };
  }

  return {
    props: {
      username: data.implicitLogin?.username,
      loggedIn: data.implicitLogin?.loggedIn
    } as HomeProps
  };
};

export default Home;
