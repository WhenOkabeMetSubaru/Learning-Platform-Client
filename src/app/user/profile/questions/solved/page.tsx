"use client"
import UserLayout from '@/app/layout/userLayout'
import React, { useEffect, useState } from 'react'
import { SideMenuItems, sideMenuItemsObj } from '../../sideMenuItemsProfile'
import { useRouter } from 'next/navigation'
import { deleteAttemptedMockByUser, getAllAttemptedMocksByUser } from '@/features/apiQueries/mockapai'
import { AiFillDelete } from 'react-icons/ai'
import { Modal } from 'antd'
import Link from 'next/link'
import { FaEdit, FaEye } from 'react-icons/fa'
import { getAllAttemptedQuestionsByUser } from '@/features/apiQueries/questionapi'
import FilterHtml from '@/components/unknownHtml'

const SolvedQuestions = () => {

  const router = useRouter();

  const [questionDetails, setQuestionDetails] = useState([]);
  const [showConfirm, setShowConfirm] = useState({ show: false, id: "" })

  useEffect(() => {

    getAllAttemptedQuestionsByUser().then((res) => {
      if (res.status == false) {
        console.log(res)
        setQuestionDetails(res?.data)
      }
    })
  }, [])

  const handleDeleteMock = async () => {

    console.log(showConfirm)
    let res = await deleteAttemptedMockByUser(showConfirm?.id);

    // if (res.status == false) {
    //   getAllAttemptedMocksByUser().then((res) => {
    //     if (res.status == false) {
    //       setMockDetails(res?.data)
    //     }
    //   })
    // }
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
          <div className='flex w-4/5 justify-between items-center '>
            <p className='text-lg'>Questions</p>
            {/* <button onClick={()=>{router.push('/user/profile/questions/created/add')}} className='w-36 text-[0.9rem] h-12 bg-purple-800 text-white rounded flex justify-center items-center'><p>Add New Question</p></button> */}
            {/* <select placeholder='Add New' defaultValue={""} onChange={(e) => router.push(e.target.value)} className='w-48 h-10 outline-none border rounded'>
              <option key={0} value="">None</option>
              <option key={1} value={"/user/profile/questions/created/add"}>Single Question</option>
              <option key={2} value={"/user/profile/questions/created/add/multiple"}>Multiple Questions</option>
            </select> */}
            <Link href="/user/profile/questions/created/add">
              <div className='w-48 h-10 bg-purple-700 hover:bg-purple-800 text-white flex justify-center items-center rounded shadow'>
                <p>Create Question</p>
              </div>
            </Link>
          </div>
          <div className='flex flex-col py-8 gap-y-2 '>

            {
              questionDetails?.map((item: any) => {
                return (
                  <div key={item?._id} className='w-2/3 min-h-[20vh] relative text-sm bg-white cursor-pointer p-3 rounded shadow border'>
                    <FilterHtml htmlContent={item?.primary_data ? item?.primary_data?.substring(0, 400) : item?.question?.substring(0, 400)} />
                    <div className='absolute right-3 bottom-2 flex gap-x-2'>
                      {item?.child_questions?.length > 0 && <p className='text-center mt-2 text-xs font-semibold text-gray-400 '>+{item?.child_questions?.length} Q&apos;s </p>}
                      {
                        
                        <Link href={`/question/solve/${item._id}/result`}>
                          <div className='flex justify-center items-center w-40 h-8 rounded shadow bg-blue-600 hover:bg-blue-700 text-white'>
                            <p>View Answer</p>
                          </div>
                        </Link>
                      }
                      
                    </div>
                  </div>
                )
              })
            }

          </div>

        </div>
      </section>
    </UserLayout>
  )
}

export default SolvedQuestions