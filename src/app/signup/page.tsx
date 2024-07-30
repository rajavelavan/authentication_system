'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Axios from 'axios';
import toast from 'react-hot-toast';
import { NextResponse } from 'next/server';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await Axios.post('/api/users/signup', user);
      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold">{loading ? 'Processing' : 'Signup'}</h1>
      <hr />
      <label htmlFor="username">UserName</label>
      <input
        className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Name"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Id"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 hover:bg-red-500"
      >
        {buttonDisabled ? 'No Signup' : 'Signup'}
      </button>
      <Link href="\login" className="font-sans">
        Visit Login page
      </Link>
    </div>
  );
}
