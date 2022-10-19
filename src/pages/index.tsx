import type { GetServerSidePropsContext, NextPage } from 'next';
import { TestDocument, useTestQuery } from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { prisma } from '../lib/prisma';
import Register from '../components/login/Register';

const Home: NextPage = () => {
  // the result of this query is already available in the apolloClient cache
  const { loading, data } = useTestQuery({
    notifyOnNetworkStatusChange: true
  });

  if (loading) {
    console.log('HAD TO LOAD!', typeof window === 'undefined');
  } else {
    console.log('NOT LOADING!', typeof window === 'undefined');
  }

  return (
    <>
      <div>{JSON.stringify(data?.test, null, 2)}</div>
      <div>
        <Register />
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  req
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({ ctx: { req, prisma } });

  await apolloClient.query({ query: TestDocument });

  return addApolloState(apolloClient, {
    props: {}
  });
};

export default Home;
