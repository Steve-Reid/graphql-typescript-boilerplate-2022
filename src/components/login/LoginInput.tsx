import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react';

type LoginInputProps = InputProps & { name: string; label: string };

const LoginInput = ({ name, label, ...props }: LoginInputProps) => {
  const [field, meta] = useField({ name });
  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontWeight="semibold">{label}</FormLabel>
      <Input
        as={Field}
        {...field}
        {...props}
        focusBorderColor="purple.500"
        variant="flushed"
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default LoginInput;
