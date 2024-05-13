"use client"
import UserLayout from '@/app/layout/userLayout';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'



const ignoreLinks = ['/user/profile/questions/created/add','/user/profile/questions/created/add/multiple']

const SideMenuItemsProfile = ({ children }: { children: ReactNode }) => {

    const pathName = usePathname();
    const router = useRouter();

    const SideMenuItems = ({ path, name }: { path: string, name: string }) => {
        return (
            <li onClick={() => { router.push(path) }} className={`h-12 border cursor-pointer hover:bg-gray-100 duration-100  flex items-center justify-center ${(typeof window !== 'undefined' && window?.location.pathname == path) ? 'bg-gray-200' : ''}`}>{name}</li>
        )
    }

    return (

        ignoreLinks?.includes(pathName) ? < section > {children}</section > :
            <UserLayout>
                <section className='flex justify-end'>

                    <div className='w-1/4 rounded-bl rounded-tl shadow-md min-h-[25rem]  '>
                        <div className='w-full h-20 flex justify-center items-center text-white bg-orange-700'>
                            <p>Account Information</p>
                        </div>
                        <ul className='my-3 gap-y-2'>
                            {
                                sideMenuItemsObj?.map((menuItems, i) => {
                                    return <SideMenuItems key={i} path={menuItems.path} name={menuItems.name} />
                                })
                            }


                        </ul>

                    </div>
                    {children}

                </section>
            </UserLayout>




    )
}

export default SideMenuItemsProfile


export const SideMenuItems = ({ path, name }: { path: string, name: string }) => {
    const router = useRouter();
    return (
        <li onClick={() => { router.push(path) }} className={`h-12 border cursor-pointer hover:bg-gray-100 duration-100  flex items-center justify-center `}>{name}</li>
    )
}

export const sideMenuItemsObj = [
    {
        name: 'Profile Details',
        path: '/user/profile/'
    }, {
        name: 'Your Questions',
        path: '/user/profile/questions/created'
    },
    {
        name: 'Your Mocks',
        path: '/user/profile/mocks/created'
    },
    {
        name: 'Solved Questions',
        path: '/user/profile/questions/solved'
    }, {
        name: 'Solved Mocks',
        path: '/user/profile/mocks/solved'
    }
    ,
    {
        name: 'Overall Analysis',
        path: '/user/profile/analysis'
    }

]
