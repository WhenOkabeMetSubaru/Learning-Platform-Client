'use client'
import useWindowDimensions from '@/components/customhooks/useDimensionHook'
import type { NextPage } from 'next'
import Image from 'next/image'
import UserLayout from './layout/userLayout'
import { useEffect, useState } from 'react'
import { getAllMocks, getMockAccessByUser } from '@/features/apiQueries/mockapai'
import auth from '@/features/authentication/auth'
import { useRouter } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'
import Link from 'next/link'
import { IoIosArrowRoundForward } from 'react-icons/io'


let demo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

const Home: NextPage = () => {

  const [progress, setProgress] = useState(0)
  const [mockDetails, setMockDetails] = useState([]);
  const router = useRouter();

  const symbols = ['Mocks', 'Attempted 5', 'Created 6'];
  const questionText = ['Questions','Attempted 5','Created 7']
  let count = 0

  useEffect(() => {


    getAllMocks({ token: auth?.isAuthenticated() }).then((res) => {
      if (res.status == false) {
        setMockDetails(res.data);
      }

    })

    
    // let mockCardInterval = setInterval(() => {
    //   count = (count + 1) % symbols.length
    //   document!.getElementById("mockCard1")!.innerHTML = symbols[count];
      
    // }, 10000)

    // let questionCardInterval = setInterval(() => {
    //   document!.getElementById("questionCard1")!.innerHTML = questionText[count];
    // }, 10000)

    // return ()=>{
    //   clearInterval(mockCardInterval);
    //   clearInterval(questionCardInterval)
    // }

  }, [])

  const handleMockStart = async (id: string) => {
    setProgress(20);
    let res = await getMockAccessByUser(id, auth?.isAuthenticated());
    setProgress(60);
    if (res.status == false) {
      setProgress(100);
      router.push(`/mock/${res?.data?._id}`)
    }
  }



  return (
    <UserLayout>
      <section className=''>
        <div className='flex  gap-5 p-5'>
          <div className='shadow w-[20rem] overflow-hidden  relative border  rounded bg-white'>
            <div id="mockCard1" className='text-4xl duration-500 font-mono flex justify-center items-center h-[10rem] bg-gradient-to-tr from-orange-500 to-pink-600 font-semibold text-white '>
              Mocks
            </div>
            {/* <div className='p-3 flex flex-col gap-y-6'>
              <div className='flex p-2 bg-gray-100 rounded justify-between'>
                <p>Attempted</p>
                <p>2</p>
              </div>
              <div className='flex p-2 bg-gray-100 rounded justify-between'>
                <p>Created</p>
                <p>5</p>
              </div>
            </div> */}

          </div>

          <div className='shadow w-[20rem] overflow-hidden  relative border  rounded bg-white'>
            <div id="questionCard1" className='text-4xl font-mono flex justify-center items-center h-[10rem] bg-gradient-to-r from-lime-500 to-green-700 font-semibold text-white '>
              Questions
            </div>
            {/* <div className='p-3 flex flex-col gap-y-6'>
              <div className='flex p-2 bg-gray-100 rounded justify-between'>
                <p>Attempted</p>
                <p>3</p>
              </div>
              <div className='flex p-2 bg-gray-100 rounded justify-between'>
                <p>Created</p>
                <p>6</p>
              </div>
            </div> */}

          </div>

          <div className='flex flex-col gap-y-2'>
            <div className='h-[4.5rem] p-4 bg-white rounded border w-[15rem]'>
              <Link href="/user/profile/mocks/created/add">
                <div className='w-full h-full rounded gap-x-3 bg-purple-700 text-white flex justify-between px-3 items-center'>
                  <p>Add New Mock</p>
                  <IoIosArrowRoundForward className='animate-pulse delay-500' size={25}/>
                </div>
              </Link>
            </div>
            <div className='h-[4.5rem] p-4 bg-white rounded border w-[15rem]'>
              <Link href="/user/profile/questions/created/add">
                <div className='w-full h-full rounded gap-x-3 px-3 bg-purple-700 text-white flex justify-between items-center'>
                  <p>Add New Question</p>
                  <IoIosArrowRoundForward className='animate-pulse delay-500' size={25} />
                </div>
              </Link>
            </div>
          </div>

        </div>

      </section>
    </UserLayout >

  )
}

export default Home
