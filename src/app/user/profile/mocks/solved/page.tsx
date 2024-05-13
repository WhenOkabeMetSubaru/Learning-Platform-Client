"use client"
import UserLayout from '@/app/layout/userLayout'
import React from 'react'
import { SideMenuItems, sideMenuItemsObj } from '../../sideMenuItemsProfile'

const SolvedMocks = () => {
  return (
    <UserLayout>
      <section className='flex justify-end'>

        <div className='w-1/5 rounded-bl rounded-tl min-h-[25rem] '>
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
      </section>
    </UserLayout>
  )
}

export default SolvedMocks