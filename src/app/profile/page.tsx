'use client';
import Axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const logout = async () => {
    try {
      await Axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const UserDetails = async () => {
    const res = await Axios.get('api/users/user');
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold">Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="px-4 py-2 border border-grey-300 rounded-lg mx-4 my-4 bg-black-500 hover:bg-red-500 text-white font-bold"
      >
        Logout
      </button>
      <hr />
      <button
        onClick={UserDetails}
        className="px-4 py-2 border border-grey-300 rounded-lg mx-4 my-2 bg-black-500 hover:bg-red-500 text-white font-bold"
      >
        Get the user details
      </button>
    </div>
  );
}
