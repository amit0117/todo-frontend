import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLoginMutation } from '../services/userServices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loggedIn } from '../features/authSlice';
import RenderErrorMessage from './renderErrorMessage';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email format.',
      password: (value) =>
        value.trim() === '' ? 'Password Can not be empty.' : null,
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  async function loginHandler() {
    const { email, password } = form.getValues();
    const result = await login({ email, password });
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
          {isError && <RenderErrorMessage error={error} isError={isError} />}
          <div className='w-full flex flex-row justify-end items-center'>
            <Button type='submit' loading={isLoading}>
              Login
            </Button>
          </div>
        </form>
        <div className='w-full  text-[15px] text-center my-2 '>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='underline font-semibold text-gray-400 px-2'
          >
            Register
          </Link>
          instead.
        </div>
      </div>
    </div>
  );
};

export default Login;
