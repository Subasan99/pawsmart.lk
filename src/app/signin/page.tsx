'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginUser } from './action';

const SignUp = () => {
  const router = useRouter(); 
  const [userInfo, setUserInfo] = useState({
    // name: '',
    email: '',
    password: '',
    // confirmPassword: '', 
  });

  const backgroundImageStyle = {
    backgroundImage: 'url(/SignUp.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo((currInfo) => ({
      ...currInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (userInfo.password !== userInfo.confirmPassword) {
    //   alert('Passwords do not match!');
    //   return;
    // }

    try {
      const response = await loginUser({
        email: userInfo.email,
        password: userInfo.password,
      });

      console.log('User Info Submitted:', response);
      // Redirect to dashboard after successful registration
      // router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <main className="h-screen">
      <header className="w-full h-full">
        <section className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            <div
              className="col-span-1 lg:col-span-2 bg-blue-500 flex items-center justify-center p-10"
              style={backgroundImageStyle}
            ></div>
            <form onSubmit={handleSubmit}>
              <div className="bg-white flex flex-col pl-20 pr-20">
                <Image
                  src="/stubby.png"
                  alt="Company Logo"
                  width={217}
                  height={72}
                  className="mt-20 mb-5"
                />

                {/* <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    USER NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="User Name"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.name}
                  />
                </div> */}

                <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    E-MAIL ADDRESS
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

                {/* <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.confirmPassword}
                  />
                </div> */}

                <div>
                  <button
                    type="submit"
                    className="py-2 px-8 bg-purple-600 text-white border-none rounded text-xm cursor-pointer hover:scale-100"
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

export default SignUp;
