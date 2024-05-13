'use client'
import useWindowDimensions from '@/components/customhooks/useDimensionHook'
import type { NextPage } from 'next'
import Image from 'next/image'
import UserLayout from '@/app/layout/userLayout'
import { useEffect, useState } from 'react'
import { getAllMocks, getAllMocksByPageAndFilter, getMockAccessByUser } from '@/features/apiQueries/mockapai'
import auth from '@/features/authentication/auth'
import { useRouter } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'


let demo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

const MockAll: NextPage = () => {

    const [mockDetails, setMockDetails] = useState([]);
    const router = useRouter();
    const [progress, setProgress] = useState(0)

    useEffect(() => {


        getAllMocks({ token: auth?.isAuthenticated() }).then((res) => {
            if (res.status == false) {
                setMockDetails(res.data);
            }

        })

        // getAllMocksByPageAndFilter({pageSize:5,pageNumber:1}).then((res)=>{
            
        // })

    }, [])

    const handleMockStart = async (id: string) => {
        setProgress(20);
        let res = await getMockAccessByUser(id, auth?.isAuthenticated());
        setProgress(60)
        if (res.status == false) {
            setProgress(100)
            router.push(`/mock/${res?.data?._id}`)
        }
    }



    return (
        <UserLayout>
            <section className=''>
                <LoadingBar
                    color='red'
                    height={3}
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
                <div className='p-5'>
                    <p className='text-xl font-semibold'>Mocks</p>
                    <div className='flex flex-col gap-y-2 pt-5 pb-20'>
                        {
                            mockDetails?.map((item: any, i: number) => {
                                return (
                                    <div key={item?._id} className='w-1/2 rounded-lg h-44 border relative cursor-pointer shadow p-3'>
                                        <p className='font-semibold'>{item?.title}</p>
                                        <p className='mt-2 text-xs text-gray-400'>{item?.description}</p>
                                        <button onClick={() => { handleMockStart(item?._id); }} className='absolute right-5 bottom-4 hover:bg-white hover:border hover:text-blue-500 hover:border-blue-500 duration-300 w-24 h-8 rounded bg-blue-600 text-white flex justify-center items-center'>
                                            <p>Start</p>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </section>
        </UserLayout >

    )
}

export default MockAll
