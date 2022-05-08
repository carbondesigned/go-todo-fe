import { useAppContext } from 'contexts/AppContext';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import api from 'utils/AxiosStore';

type Props = {};

interface IForm {
  email: string;
  password: string;
}

const Signin: NextPage = (props: Props) => {
  const { setToken } = useAppContext();
  const router = useRouter();
  const formInputStyle: string = `rounded bg-gray-900 border-[0.25px] border-gray-600 text-white p-2 focus:border-transparent`;

  const [formData, setFormData] = useState<IForm>({
    email: '',
    password: '',
  });

  // react query mutation
  const signup = useMutation(
    async (data: IForm) => {
      const { email, password } = data;
      const res = await api.post('/api/auth/signin', {
        email: email,
        password: password,
      });
      if (res.data.success === true) {
        setToken(res.data.token);
        router.push('/');
      }
      return res.data;
    },
    {
      onSuccess: (res) => {},
    }
  );
  return (
    <div>
      <Head>
        <title>Sign Up</title>
        <meta name='description' content='Sign up' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-gray-900 h-screen text-gray-200 grid place-items-center'>
        <div className='p-12 rounded-xl bg-gray-800'>
          <div className='flex flex-col gap-2 w-4/6'>
            <h1 className=' text-4xl font-bold'>
              Keep Track of Your Todos the Easy Way
            </h1>
            <p className='text-gray-400'>
              This is a simple todo app that you can use to keep track of your
              todos.
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signup.mutate({
                  email: formData.email,
                  password: formData.password,
                });
              }}
              className='flex flex-col gap-4 mt-12'
            >
              <div className='flex flex-col gap-2'>
                <label htmlFor='email'>Email address</label>
                <input
                  type='email'
                  name='email'
                  className={formInputStyle}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  className={formInputStyle}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='flex flex-col gap-6'>
                <div className='flex gap-4 justify-center items-center'>
                  <button
                    type='submit'
                    className='bg-blue-700 flex-1 py-4 px-12 rounded-lg font-bold'
                  >
                    Sign In
                  </button>
                  <div className='pl-6'>
                    <p>
                      Or{' '}
                      <span>
                        <Link href='/signup' className='font-bold px-6'>
                          <a className='font-bold'>Sign Up</a>
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
                <Link href='/'>
                  <a>Continue as Guest</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signin;
