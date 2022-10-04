import type { GetServerSidePropsContext, NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import { prisma } from '../../lib/prisma';
import Register from '../components/login/Register';

const testQuery = gql`
  {
    test(bool: true)
  }
`;

const Home: NextPage = () => {
  // the result of this query is already available in the apolloClient cache
  const { loading, data } = useQuery(testQuery, {
    notifyOnNetworkStatusChange: true
  });

  if (loading) {
    console.log('HAD TO LOAD!', typeof window === 'undefined');
  } else {
    console.log('NOT LOADING!', typeof window === 'undefined');
  }

  return (
    <>
      <div>{JSON.stringify(data, null, 2)}</div>
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

  await apolloClient.query({ query: testQuery });

  return addApolloState(apolloClient, {
    props: {}
  });
};

export default Home;
