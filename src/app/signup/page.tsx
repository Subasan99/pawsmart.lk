'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const backgroundImageStyle = {
    backgroundImage: 'url(/SignUp.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setUserInfo((currInfo) => {
      return {
        ...currInfo,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log('User Info Submitted:', userInfo);
    // router.push('/dashboard');
  };
  return (
    <main className="h-screen ">
      <header className="w-full h-full">
        <section className="w-full h-full">
          <div className="grid  grid-cols-1 lg:grid-cols-3 h-full">
            <div
              className="col-span-1 lg:col-span-2  bg-blue-500 flex items-center justify-center p-10"
              style={backgroundImageStyle}
            ></div>
            <form onSubmit={handleSubmit}>
              <div className="bg-white flex flex-col pl-20 pr-20">
                <Image
                  src="/stubby.png"
                  alt="Company Logo"
                  width={217}
                  height={72}
                  className=" mt-20 mb-5 "
                />

                <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    SIGN IN
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-Mail Address"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.email}
                  />
                </div>

                <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.password}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="py-2 px-8 bg-purple-600 text-white border-none rounded text-xm cursor-pointer  hover:scale-100  "
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </header>
    </main>
  );
};

export default SignIn;
