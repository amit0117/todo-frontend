import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRegisterMutation } from '../services/userServices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loggedIn } from '../features/authSlice';
import { Link } from 'react-router-dom';
import RenderErrorMessage from './renderErrorMessage';
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  console.log('in login page', isLoggedIn);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validate: {
      name: (value) =>
        value.trim() === '' ? 'Name is a required Field' : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email format.',
      password: (value) =>
        value.trim() === '' ? 'Password is a required Field.' : null,
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  async function loginHandler() {
    const { name, email, password } = form.getValues();
    const result = await register({ name, email, password });
    if (result.data) {
      dispatch(loggedIn());
      localStorage.setItem('token', JSON.stringify(result.data.token));
      navigate('/');
    } else {
      console.error('Something went wrong');
    }
  }

  return (
    <div className='min-w-full min-h-screen flex items-start justify-center'>
      <div className='w-[30%]  mx-auto bg-slate-500 border-[1px] border-slate-200 rounded p-2 mt-20'>
        <form
          onSubmit={form.onSubmit(loginHandler)}
          className='w-full flex flex-col justify-start items-start gap-4'
        >
          <TextInput
            withAsterisk
            label='Name'
            placeholder='John Doe'
            key={form.key('name')}
            {...form.getInputProps('name')}
            className='min-w-full'
          />
          <TextInput
            withAsterisk
            label='Email'
            placeholder='your@email.com'
            key={form.key('email')}
            {...form.getInputProps('email')}
            className='min-w-full'
          />
          <PasswordInput
            withAsterisk
            label='Password'
            placeholder='Password'
            key={form.key('password')}
            {...form.getInputProps('password')}
            className='w-full'
          />
          {isError && <RenderErrorMessage isError={isError} error={error} />}
          <div className='w-full flex flex-row justify-end items-center'>
            <Button type='submit' loading={isLoading}>
              Register
            </Button>
          </div>
        </form>
        <div className='w-full text-[15px] text-center my-2'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='underline font-semibold text-gray-400 px-2'
          >
            Login
          </Link>
          instead.
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
