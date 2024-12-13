// src/components/Login/index.js
import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
