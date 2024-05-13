"use client"
import UserLayout from '@/app/layout/userLayout'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsProps } from "antd"
import { useParams } from 'next/navigation'
import { getAllDetailsAboutMock } from '@/features/apiQueries/mockapai'
import auth from '@/features/authentication/auth'
import { CustomCollapseCard } from '@/components/utils/extraComponent'
import { optionNumberToChar, removeHTMLTagRegex } from '@/components/extrafunction'
import FilterHtml from '@/components/unknownHtml'

const MockResult = () => {

    const params = useParams();


    const [bundleDetails, setBundleDetails] = useState<any>([]);
    const [questionDetails, setQuestionDetails] = useState<any>({});
    const [currentSection, setCurrentSection] = useState<string>('');
    const [currentQuestion, setCurrentQuestion] = useState<any>({})
    const [multipleInputs, setMultipleInputs] = useState<any>([]);
    const [multipleTimer, setMultipleTimer] = useState<any>([])


    useEffect(() => {
        getAllDetailsAboutMock({ mockId: params?.mockId, token: auth?.isAuthenticated() }).then((res: any) => {
            if (res.status == false) {
                setBundleDetails(res.data?.bundleDetails);

                let bundleTemp = res?.data?.bundleDetails;


                setQuestionDetails(res?.data?.questionDetails);


                setCurrentSection(res?.data?.bundleDetails[0]?._id);
                let tempQuestion = res?.data?.questionDetails[res?.data?.bundleDetails[0]?._id][0];
                setCurrentQuestion(tempQuestion);

                let inputs = tempQuestion?.options?.map((item: any, i: number) => {
                    return {
                        checked: tempQuestion?.user_answer == (i + 1)?.toString() ? true : false,
                        index: item.question_no,
                        option: item.title
                    }
                })


                setMultipleInputs(inputs)
            }
        })
    }, [])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <p className=' text-center px-20'>Across Mock Analysis</p>,
            children: <section className=' px-3 flex justify-center font-sans '>
                <div className='min-h-screen flex border w-5/6'>
                    <div className='w-2/3 relative'>
                        {currentQuestion?.question_view_type == "half" &&
                            <>
                                <p className='text-xs font-semibold px-3 py-1 absolute left-3 top-1  bg-blue-400 text-white'>Instructions</p>



                                <div className='pt-14 mx-4 px-4 border-b-[0.18rem] rounded-b shadow-b border-sky-400 pb-10 min-h-[50vh] text-[#8b8b8b] font-extralight text-[1rem] '>
                                    <FilterHtml htmlContent={currentQuestion?.primary_data} />
                                </div>
                            </>
                        }

                        <div className='pt-14 mx-4 px-4 border-b-[0.18rem] rounded-b shadow-b relative border-sky-400 pb-10 min-h-[50vh] text-[#8b8b8b] font-extralight text-[0.98rem] '>
                            <p className='absolute left-2 top-1 px-1.5 py-0.5 text-sm font-thin  bg-blue-500 text-white flex justify-center items-center'>Q{currentQuestion?.question_count}</p>
                            <FilterHtml htmlContent={currentQuestion?.question} />
                            <div className='flex flex-col mt-3 gap-y-3'>
                                
                                {
                                    currentQuestion?.options?.map((option:any,idx:number)=>{
                                        return (
                                            <div key={"opT" +idx } className='min-h-[8vh]  p-1 leading-6 border relative border-gray-400 w-full rounded flex items-center  px-2'>
                                                <div className='w-7 h-7 absolute left-2 top-[25%] rounded-full bg-gray-500 text-white flex justify-center items-center'>
                                                    {optionNumberToChar[option?.question_no]}
                                                </div>
                                                <div className='pl-10'><FilterHtml htmlContent={option?.title}/></div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                           
                        </div>
                    </div>
                    <div className='w-1/3 min-h-[100vh] '>
                        <div className='flex p-3 flex-col gap-y-3'>

                            {
                                bundleDetails?.map((bundle: any) => {
                                    return (
                                        <CustomCollapseCard setCurrentQuestion={setCurrentQuestion} bundleDetails={bundle} key={bundle?._id} questionDetails={questionDetails} />
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

            </section>,
        },
        {
            key: '2',
            label: <p className=' text-center px-20'>CAT 2022 Slot 2 Question Paper Analysis</p>,
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: <p className=' text-center px-20'>CAT 2022 Slot 2 Question Paper Solutions</p>,
            children: 'Content of Tab Pane 3',
        },
    ];

    const handleTabChange = (e: any) => {
        console.log(e)
    }




    return (
        <UserLayout>
            <section className=''>
                <div className='pt-5 px-2'>
                    <Tabs size='large' indicator={{ size: (origin) => origin - 20, align: "center" }} centered defaultActiveKey="1" items={items} onChange={handleTabChange} />;
                </div>


            </section>
        </UserLayout >
    )
}

export default MockResult