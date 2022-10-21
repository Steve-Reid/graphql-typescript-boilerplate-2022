import { Heading } from '@chakra-ui/react';

interface StatusTextProps {
  errMsg?: string;
  statusMsg?: string;
}

const StatusText = ({ errMsg, statusMsg }: StatusTextProps) =>
  errMsg ?? statusMsg ? (
    <Heading
      color={errMsg ? 'red.500' : 'green.500'}
      fontSize="lg"
      textAlign="center"
    >
      {errMsg ?? statusMsg}
    </Heading>
  ) : null;

export default StatusText;
