"use client"
import UserLayout from '@/app/layout/userLayout'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SideMenuItems, sideMenuItemsObj } from './sideMenuItemsProfile';
import { UserAuthFinal } from '@/features/contextApi/userAuthProvider';



const Profile = () => {



    let {currentUser}:any = UserAuthFinal()


    return (

        <UserLayout>
            <section className='flex justify-end'>

                <div className='w-1/5 rounded-bl rounded-tl min-h-[25rem]  '>
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
                <div className='w-3/4 border p-4 min-h-[40rem] bg-white'>
                    <p className='text-xl font-semibold '>User Details</p>
                    <div className='mt-6 grid grid-cols-2 gap-3 w-3/4'>
                        <p>First Name</p>
                        <p>{currentUser?.name}</p>
                        
                        {/* <p>Last Name</p>
                        <p>Fangudu</p> */}
                        <p>Email</p>
                        <p>{currentUser?.email}</p>
                        {/* <p>Mobile</p>
                        <p>+918738478374</p> */}
                    </div>
                </div>
            </section>
        </UserLayout>

    )
}

export default Profile