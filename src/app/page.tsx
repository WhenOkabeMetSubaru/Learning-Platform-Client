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


let demo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

const Home: NextPage = () => {

  const [progress, setProgress] = useState(0)
  const [mockDetails, setMockDetails] = useState([]);
  const router = useRouter();

  useEffect(() => {


    getAllMocks({ token: auth?.isAuthenticated() }).then((res) => {
      if (res.status == false) {
        setMockDetails(res.data);
      }

    })

  }, [])

  const handleMockStart = async (id: string) => {
    setProgress(20);
    let res = await getMockAccessByUser(id,auth?.isAuthenticated());
    setProgress(60);
    if(res.status==false){
      setProgress(100);
      router.push(`/mock/${res?.data?._id}`)
    }
  }



  return (
    <UserLayout>
      <section className=''>
        <div className='flex gap-5 p-5'>
          <div className='w-1/3 overflow-hidden p-3 relative shadow-lg h-[20rem] rounded bg-gradient-to-br from-lime-500 to-lime-600'>
            <p className='text-3xl font-semibold text-white m-3'>
              Mocks
            </p>
            <div className='absolute flex flex-col shadow-lg text-white font-sans justify-center items-center w-36 h-36 rounded-full bg-lime-800 bottom-3 right-44 z-10'> 
              <p className='text-xl text-lime-100'>Created</p>
              <p className='text-center text-3xl'>10</p>
            </div>
            <div className='absolute flex flex-col shadow-lg text-white font-sans justify-center items-center w-56 h-56 rounded-full bg-gradient-to-tr from-orange-600 to-orange-700 top-3 right-8'>
              <p className='text-2xl text-lime-100'>Attempted</p>
              <p className='text-center text-4xl'>10</p>
            </div>
          </div>
          <div className='w-1/3 overflow-hidden p-3 relative shadow-lg h-[15rem] rounded bg-gradient-to-br from-pink-700 to-pink-800'>
            <p className='text-3xl font-semibold text-white m-3'>
              Questions
            </p>
            <div className='absolute flex flex-col shadow-lg text-white font-sans justify-center items-center w-32 h-32 rounded-full bg-blue-400 bottom-3 right-44 z-10'>
              <p className='text-xl text-lime-100'>Created</p>
              <p className='text-center text-3xl'>20</p>
            </div>
            <div className='absolute flex flex-col shadow-lg text-white font-sans justify-center items-center w-44 h-44 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 top-3 right-8'>
              <p className='text-2xl text-lime-100'>Attempted</p>
              <p className='text-center text-4xl'>30</p>
            </div>
          </div>
        </div>

    </section>
    </UserLayout >

  )
}

export default Home
