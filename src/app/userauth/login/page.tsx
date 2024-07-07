"use client"
import React, { useState } from 'react'
import { loginUser } from '../../../features/apiQueries/userapi';
import { handleLoginResponse, handleSignupResponse } from './loginapi';
import auth from '@/features/authentication/auth';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/utils/extraComponent';
import { UserAuthFinal } from '@/features/contextApi/userAuthProvider';
import { Form,Input, notification } from 'antd';
import { FaLock, FaUser } from 'react-icons/fa';


const Login = () => {
    const router = useRouter();

    const [userDetails, setUserDetails] = useState<UserLoginProps>({ email: "", password: "" });

    const { } = UserAuthFinal();

    const [tab, setTab] = useState("login");
    const [loader, setLoader] = useState(false);

    const [loginForm] = Form.useForm();
    const [signupForm] = Form.useForm();
    const navigate = useRouter();

    const handleLogin = async (values:any)=>{
      
        let data = await handleLoginResponse(values);

        auth.authenticate(data.token,()=>{router.push('/')})
    }

    const handleSignup =  async (values:any)=>{
        let data = await handleSignupResponse(values);
        console.log(data)
        if(data.status==false){
            notification.success({message:data?.info})
            setTab('login')
        }
    }

    return (
        <section style={{ background:"rgba(22,22,22,0.6) url('/images/loginscreenwp1.jpg') 22%"}} className='bg-center bg-no-repeat bg-cover min-h-screen flex justify-center items-center'>
            {/* <div className='w-1/2 min-h-[20rem] shadow bg-white border-gray-200 border rounded'>
                <form onSubmit={handleLoginSubmit} className='p-5'>
                    <div>
                        <p>Email</p>
                        <input name="email" value={userDetails.email} onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}} type="email" className='border-gray-400 border outline-none px-2 rounded w-full h-10'/>
                    </div>
                    <div>
                        <p>Password</p>
                        <input name="password" value={userDetails.password} onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}} type={"password"} className='border-gray-400 border outline-none px-2 rounded w-full h-10' />
                    </div>
                    <div className='mt-10 flex justify-center'>
                        <button className='w-1/2 flex bg-green-700  text-white rounded shadow justify-center items-center h-10'>
                            <p>Login</p>
                        </button>
                    </div>
                </form>
            </div> */}

            <Tabs name={"login"} tab={tab}>
                <section className='flex justify-center items-center z-50 bg-[#09020208]' style={{ width: '100%', height: '100vh' }}>
                    <div className='text-lg bg-white min-w-[30rem] px-14 py-8 rounded-lg shadow h-[30rem] border'>
                        <p className='text-3xl pt-2 pb-10 text-center font-bold text-orange-800'>Login</p>
                        <Form layout='vertical' className='' form={loginForm} onFinish={handleLogin}>
                            <Form.Item rules={[{ required: true, message: "Email is required" }]} name="email" >
                                <Input style={{ height: '50px' }} placeholder='Email' prefix={<FaUser />} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: "Password is required" }]} name="password" >
                                <Input.Password style={{ height: '50px' }} prefix={<FaLock />} placeholder='**********' />
                            </Form.Item>

                            <button className='flex w-full h-10 text-lg justify-center items-center bg-orange-600 text-white rounded shadow hover:bg-orange-700'>{loader == false ? "Login" : <div className="loader"></div>}</button>

                            <p className='py-3 text-center text-lg font-semibold'>or</p>

                            <button onClick={() => setTab('signup')} type="button" className='flex w-full h-10 text-lg justify-center items-center bg-indigo-600 text-white rounded shadow hover:bg-indigo-700'>SignUp</button>
                        </Form>
                    </div>
                </section>
            </Tabs>
            <Tabs name="signup" tab={tab}>
                <section className='flex justify-center items-center z-50 bg-[#09020208]' style={{ width: '100%', height: '100vh' }}>
                    <div className='text-lg bg-white min-w-[30rem] px-14 py-8 rounded-lg shadow h-[35rem] border'>
                        <p className='text-3xl pt-2 pb-10 text-center font-bold text-orange-600'>Create an Account</p>
                        <Form layout='vertical' form={signupForm} onFinish={handleSignup}>
                            <Form.Item rules={[{ required: true, message: "Name is required" }]} name="name" >
                                <Input style={{ height: '50px' }} placeholder='Name' prefix={<FaUser />} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: "Email is required" }]} name="email" >
                                <Input style={{ height: '50px' }} placeholder='Email' prefix={<FaUser />} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: "Password is required" }]} name="password" >
                                <Input.Password style={{ height: '50px' }} placeholder='**********' prefix={<FaLock />} />
                            </Form.Item>
                            <button className='flex w-full h-10 text-lg justify-center items-center bg-orange-600 text-white rounded shadow hover:bg-orange-700'>Signup</button>

                            <p className='py-3 text-center text-lg font-semibold'>or</p>

                            <button onClick={() => setTab('login')} type="button" className='flex w-full h-10 text-lg justify-center items-center bg-indigo-600 text-white rounded shadow hover:bg-indigo-700'>Go to Login</button>
                        </Form>
                    </div>
                </section>
            </Tabs>

        </section>
    )
}

export default Login