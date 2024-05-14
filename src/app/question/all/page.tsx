/* eslint-disable */
"use client"

import UserLayout from '@/app/layout/userLayout'
import FilterHtml, { FilterHtmlReturnData } from '@/components/unknownHtml';
import { getAllQuestionsByPageAndFilter, getAllQuestionsHomePage } from '@/features/apiQueries/questionapi';
import UserAuth from '@/features/contextApi/userAuthProvider'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const QuestionAll = () => {

    const [questionDetails, setQuestionDetails] = useState<any>({});
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {

        // getAllQuestionsHomePage().then((res: any) => {
        //     if (res?.status == false) {
        //         setQuestionDetails(res?.data)
        //     }
        // })

        getAllQuestionsByPageAndFilter({ pageNumber: 1, pageSize: 5 }).then((res: any) => {
            if (res?.status == false) {
                setQuestionDetails(res)
            }
        })

    }, [])

    const handleFetchMoreData = async () => {


        getAllQuestionsByPageAndFilter({ pageNumber: pageNumber + 1, pageSize: questionDetails?.limit }).then((res: any) => {
            if (res?.status == false) {
                setPageNumber(pageNumber + 1)
                let temp = [...questionDetails?.data];
                let updatedData = {
                    ...res,
                    data: [...temp, ...res?.data]
                }
                setQuestionDetails(updatedData);
            }
        })
    }

    return (
        <UserLayout>
            <section>
                <div className='p-3 '>
                    <p className='text-xl font-semibold'>Questions</p>
                    <InfiniteScroll loader={<div className='flex justify-center w-full items-center h-20'>
                        <div className='loader' />
                    </div>} hasMore={questionDetails?.data?.length < questionDetails?.totalDocs} next={handleFetchMoreData} dataLength={questionDetails?.data?.length || 10} className='pt-3 pb-10 flex flex-col gap-y-3'>
                        {
                            questionDetails?.data?.map((item: any, i: number) => {
                                return (
                                    /* eslint-disable-line */
                                    <QuestionComponentHome key={i} item={item} />
                                )
                            })
                        }
                    </InfiniteScroll>

                </div>
            </section>
        </UserLayout>
    )
}

export default QuestionAll

/* eslint-disable-line */
const QuestionComponentHome = ({ item }: { item: any }) => {
    return (
        <div className='min-h-[20vh] py-2 px-2.5 relative border rounded shadow w-1/2'>
            <p className='text-lg font-semibold py-3'>{item?.title || "No Title"}</p>
            <div className='min-h-[16vh] text-sm'>
                <FilterHtml htmlContent={item?.primary_data ? item?.primary_data?.substring(0, 400) : item?.question} />
            </div>
            <div className='absolute right-3 bottom-2 flex gap-x-2'>
                <Link href={"/question/view/" + item?._id}>
                    <div className='flex justify-center items-center w-28 h-8 rounded shadow bg-blue-600 hover:bg-blue-700 text-white'>
                        <p>Interface</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}