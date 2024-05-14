import Link from 'next/link'
import React, { Fragment, ReactNode, useState } from 'react'
import { navBarPageProps } from '@/components/utils/routespath'
import { FaUserCircle } from "react-icons/fa";
import { UserAuthFinal } from '@/features/contextApi/userAuthProvider';
import { RiShutDownLine } from 'react-icons/ri';
import { PiTagThin } from 'react-icons/pi';


const UserLayout = ({ children }: { children: ReactNode }) => {

    const { currentUser, logout }: any = UserAuthFinal();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <Fragment>
            <div className='h-16 w-full px-8 shadow flex hover justify-between items-center fixed left-0 right-0 top-0 z-40 bg-blue-500 text-white'>
                <div>
                    <Link href="/"><p className="font-semibold cursor-pointer text-xl font-serif">TEST FEVER</p></Link>
                </div>
                <div className='w-1/2'>
                    <ul className='flex justify-around'>
                        {
                            navBarPageProps?.map((item: any, i: number) => {
                                return (
                                    <Link key={i + "nav"} href={item?.path}>
                                        <div className='relative'>
                                            <li key={i} className='cursor-pointer hover:underline duration-500 '>
                                                {item?.name}
                                            </li>
                                            {
                                                item?.path =='/question/all' &&
                                                <div className='absolute flex justify-center items-center animate-pulse delay-200 text-[0.45rem] w-5 h-5 rounded-lg bg-red-500 top-2 -right-5'>
                                                    New
                                                </div>
                                            }
                                        </div>
                                    </Link>
                                )
                            })
                        }

                    </ul>
                </div>
                <div>

                    <div className='relative'>
                        <FaUserCircle onClick={() => { setOpenMenu(!openMenu) }} className='cursor-pointer' size={35} />
                        <div hidden={openMenu == false} className='absolute right-5 overflow-hidden text-black text-[0.9rem] border p-2 top-10 w-36 h-48 bg-white z-10 rounded'>
                            <Link href="/user/profile" ><p className='border-b '>Settings</p></Link>
                            <div onClick={() => {
                                logout();
                                setOpenMenu(false)
                            }} className='flex absolute bg-red-500 h-8 cursor-pointer text-white bottom-0 right-0 left-0 justify-center items-center'>
                                <RiShutDownLine size={22} color='white' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {
                <div className='pt-16'>
                    {children}
                </div>
            }
        </Fragment>
    )
}

export default UserLayout