import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useMutation } from 'react-query';
import api from 'utils/AxiosStore';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from 'contexts/AppContext';

const Home: NextPage = () => {
  const { token } = useAppContext();
  return (
    <div>
      <h1>Home</h1>
      <p>You are logged in with token: {token}</p>
    </div>
  );
};

export default Home;
