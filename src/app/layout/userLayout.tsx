import Link from 'next/link'
import React, { Fragment, ReactNode } from 'react'
import { navBarPageProps } from '@/components/utils/routespath'
import { FaUserCircle } from "react-icons/fa";


const UserLayout = ({ children }: { children: ReactNode }) => {
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
                                    <Link key={i + "nav"} href={item?.path}><li key={i} className='cursor-pointer hover:underline duration-500 '>{item?.name}</li></Link>
                                )
                            })
                        }

                    </ul>
                </div>
                <div>
                    <Link href={"/user/profile"}>
                        <div>
                            <FaUserCircle className='' size={35} />
                        </div>
                    </Link>
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