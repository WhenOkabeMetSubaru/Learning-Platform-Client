"use client"
import UserLayout from '@/app/layout/userLayout'
import React, { useEffect, useState } from 'react'
import { SideMenuItems, sideMenuItemsObj } from '../../sideMenuItemsProfile'
import { useRouter } from 'next/navigation'
import { deleteAttemptedMockByUser, getAllAttemptedMocksByUser } from '@/features/apiQueries/mockapai'
import { AiFillDelete } from 'react-icons/ai'
import { Modal } from 'antd'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa'

const SolvedMocks = () => {

  const router = useRouter();

  const [mockDetails, setMockDetails] = useState([]);
  const [showConfirm, setShowConfirm] = useState({ show: false, id: "" })

  useEffect(() => {

    getAllAttemptedMocksByUser().then((res) => {
      if (res.status == false) {
        setMockDetails(res?.data)
      }
    })
  }, [])

  const handleDeleteMock = async () => {

    console.log(showConfirm)
    let res = await deleteAttemptedMockByUser(showConfirm?.id);

    if (res.status == false) {
      getAllAttemptedMocksByUser().then((res) => {
        if (res.status == false) {
          setMockDetails(res?.data)
        }
      })
    }
    setShowConfirm({ id: "", show: false })
  }

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
            <button onClick={() => { router.push("/user/profile/mocks/created/add") }} className='flex justify-center items-center w-60 h-10 bg-purple-800 text-white rounded text-[0.9rem]'>
              <p>Create New Mock</p>
            </button>
          </div>

          <div className='flex px-2 py-3 flex-col gap-y-3'>
            {
              mockDetails?.map((mock: any, idx: number) => {
                return <div key={mock?._id} className='h-28 p-5 w-3/4 cursor-pointer relative bg-white rounded border shadow'>
                  <p className='text-lg font-semibold'>{mock?.title}</p>
                  <div className='flex gap-x-2 absolute right-5 top-6'>
                    < Link href={`/mock/${mock?._id}/result`}>
                      <FaEye size={25} />
                    </Link>
                    <AiFillDelete onClick={() => setShowConfirm({ id: mock?._id, show: true })} color='red' size={22} className=' cursor-pointer' />

                  </div>


                </div>
              })


            }
          </div>

        </div>
      </section>
      <Modal open={showConfirm.show} onCancel={() => setShowConfirm({ ...showConfirm, show: false })} title={"Are you Sure?"} footer="">
        <div className=''>
          <p className='mt-3'>Deleting the mock would delete any necessary information related to it. Are you sure you want to delete it?</p>
          <div className='flex justify-end gap-x-3 mt-5'>
            <button onClick={handleDeleteMock} className='w-20 h-8 text-white flex justify-center items-center rounded bg-red-700'>
              <p>Delete</p>
            </button>
            <button onClick={() => setShowConfirm({ id: "", show: false })} className='w-20 h-8 bg-white border-red-500 border flex justify-center items-center rounded text-black'>
              <p>Cancel</p>
            </button>
          </div>
        </div>
      </Modal>
    </UserLayout>
  )
}

export default SolvedMocks