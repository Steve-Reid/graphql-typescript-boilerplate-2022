import * as Yup from 'yup';

export const registrationValidation = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username too short'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password too short'),
  email: Yup.string().required('Email is required').email('Invalid email')
});
