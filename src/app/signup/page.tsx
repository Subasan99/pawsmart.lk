'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { registerUser } from './action'; 

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    dateOfBirth: '',
    gender: '', 
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // try {
      const response = await registerUser({
        password: userInfo.password,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNo: userInfo.phoneNo,
        dateOfBirth: userInfo.dateOfBirth,
        gender: userInfo.gender,

      });
      console.log(response,'12121212121');
      alert(response?.message);
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

                <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.firstName}
                  />
                </div>

                <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.lastName}
                  />
                </div>

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
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    placeholder="Phone Number"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.phoneNo}
                  />
                </div>

                <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    DATE OF BIRTH
                  </label>
                  <input
                    type="text"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    placeholder="YYYY.MM.DD"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.dateOfBirth}
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

                <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                   GENDER
                  </label>
                  <input
                    type="gender"
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.gender}
                  />
                </div>

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
