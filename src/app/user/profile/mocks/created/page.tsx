"use client"
import UserLayout from '@/app/layout/userLayout';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SideMenuItems, sideMenuItemsObj } from '../../sideMenuItemsProfile';
import { getAllMocksByUser } from '@/features/apiQueries/mockapai';

const CreatedMocks = () => {

  const router = useRouter();

  const [mockDetails,setMockDetails] = useState<any>([]);

  useEffect(()=>{

    getAllMocksByUser().then((res)=>{
      if(res.status==false){
        setMockDetails(res?.data);
      }
    })

  },[])

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

        <div className='w-3/4 border p-4 min-h-[40rem] '>
          <div className='flex w-4/5 justify-between items-center px-2'>
            <p className='text-lg'>Mocks</p>
            {/* <button onClick={()=>{router.push('/user/profile/questions/created/add')}} className='w-36 text-[0.9rem] h-12 bg-purple-800 text-white rounded flex justify-center items-center'><p>Add New Question</p></button> */}
            {/* <select placeholder='Add New' defaultValue={""} onChange={(e) => router.push(e.target.value)} className='w-48 h-10 outline-none border rounded'>
              <option key={0} value="">None</option>
              <option key={1} value={"/user/profile/mocks/created/add"}>Single Question</option>
              <option key={2} value={"/user/profile/mockss/created/add/multiple"}>Multiple Questions</option>
            </select> */}
            <button onClick={() => { router.push("/user/profile/mocks/created/add")}} className='flex justify-center items-center w-60 h-10 bg-purple-800 text-white rounded text-[0.9rem]'>
              <p>Create New Mock</p>
            </button>
          </div>

          <div className='flex px-2 py-3 flex-col gap-y-3'>
            {
              mockDetails?.map((mock:any,idx:number)=>{
                return <div key={mock?._id} className='h-28 p-5 w-3/4 cursor-pointer relative bg-white rounded border shadow'>
                  <p className='text-lg font-semibold'>Mock Test {idx + 1}</p>
                  <p className='text-xs font-semibold absolute right-3 top-5'>{mock?.completion_status}</p>
                </div>
              })
              
            }
          </div>

        </div>
      </section>
    </UserLayout>
  )
}

export default CreatedMocks