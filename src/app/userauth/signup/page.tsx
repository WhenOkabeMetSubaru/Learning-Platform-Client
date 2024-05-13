"use client"
import React, { useState } from 'react'
import { handleSignupResponse } from './signupapi';


const Signup = () => {

    const [userDetails, setUserDetails] = useState<UserSignupProps>({name:"",email:"",password:""});

    const handleSignupSubmit = async (e: any) => {
        e.preventDefault()
         await handleSignupResponse(userDetails);
    }

    return (
        <section className='min-h-screen flex justify-center items-center'>
            <div className='w-1/2 min-h-[20rem] shadow border-gray-200 border rounded'>
                <form onSubmit={handleSignupSubmit} className='p-5'>
                    <div>
                        <p>name</p>
                        <input name="name" value={userDetails.name} onChange={(e) => { setUserDetails({ ...userDetails, name: e.target.value }) }}  className='border-gray-400 border outline-none px-2 rounded w-full h-10' />
                    </div>
                    <div>
                        <p>Email</p>
                        <input name="email" value={userDetails.email} onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} type="email" className='border-gray-400 border outline-none px-2 rounded w-full h-10' />
                    </div>
                    <div>
                        <p>Password</p>
                        <input name="password" value={userDetails.password} onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} type={"password"} className='border-gray-400 border outline-none px-2 rounded w-full h-10' />
                    </div>
                    <div className='mt-10 flex justify-center'>
                        <button className='w-1/2 flex bg-green-700  text-white rounded shadow justify-center items-center h-10'>
                            <p>Signup</p>
                        </button>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default Signup