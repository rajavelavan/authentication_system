'use client';

import Axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function verifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerifed] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await Axios.post('/api/users/verifyemail', { token });
      setVerifed(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 my-3 bg-orange-500 text-black rounded">
        {token ? `${token}` : 'no token'}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl border border-green-300 rounded-sm p-1 my-3 bg-grey-300 text-green-300 inset-y-0 left-0">
            Email Verified
          </h2>
          <Link
            href="/login"
            className="hover:text-white text-blue-400 font-bold-sans"
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500">Error</h2>
        </div>
      )}
    </div>
  );
}
