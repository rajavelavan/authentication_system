'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await Axios.post('/api/users/login', user);
      console.log('Login success', response.data);
      toast.success('Login success');
      router.push('/profile');
    } catch (error: any) {
      console.log('Loginfailed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold">{loading ? 'processing' : 'Login'}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Mailid"
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
        onClick={onLogin}
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 hover:bg-red-500"
      >
        {buttonDisabled ? 'No login' : 'Login'}
      </button>
      <Link
        href="\signup"
        className="font-bold-sans hover:text-white text-blue-400"
      >
        Visit Signup page
      </Link>
    </div>
  );
}
