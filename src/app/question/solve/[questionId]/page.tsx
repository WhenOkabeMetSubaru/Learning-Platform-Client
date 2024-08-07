"use client"
import useWindowDimensions from '@/components/customhooks/useDimensionHook';
import { handleAnswerToColor, questionStatus } from '@/components/extrafunction';
import FilterHtml from '@/components/unknownHtml';
import { getQuestionByID, getQuestionDetails, updateQuestionStatusForMock } from '@/features/apiQueries/questionapi';
import auth from '@/features/authentication/auth';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { RxEnterFullScreen } from "react-icons/rx";

const QuestionsView = () => {

    const [currentQuestion, setCurrentQuestion] = useState<any>();
    const [questionCompleteDetails, setQuestionCompleteDetails] = useState<any>([]);
    const [multipleInputs, setMultipleInputs] = useState<any>(null);
    const [answerCategory, setAnswerCategory] = useState<any>({
        'answered': 0,
        'not_answered': 0,
        'not_visited': 0,
        'reviewed_not_answered': 0,
        'reviewed_and_answered': 0
    })


    const router = useRouter();

    const regex = /(<([^>]+)>)/gi;

    const handle = useFullScreenHandle();


    let { height } = useWindowDimensions();

    const params = useParams<any>();

    useEffect(() => {

        getQuestionDetails(params?.questionId).then((res: any) => {
            if (res.status == false) {
                setQuestionCompleteDetails(res?.data);
                setCurrentQuestion(res?.data[0])


                let inputs = res?.data[0]?.options?.map((item: any, i: number) => {
                    return {
                        checked: res?.data[0]?.user_answer == (i + 1)?.toString() ? true : false,
                        index: item.option_no,
                        option: item.title
                    }
                })

                let seperateCategory: any = {
                    'answered': 0,
                    'not_answered': 0,
                    'not_visited': 0,
                    'reviewed_not_answered': 0,
                    'reviewed_and_answered': 0
                };

                for (let i = 0; i < res?.data?.length; i++) {
                    seperateCategory[res?.data[i]?.question_status] += 1;
                }


                setMultipleInputs(inputs)
            }
        })

    }, [])


    const handleGetInputData = (tempQuestion: any, mode = 'default') => {
        let inputs = tempQuestion?.options?.map((item: any, i: number) => {
            return {
                checked: mode == 'default' ? (tempQuestion?.user_answer == (i + 1)?.toString() ? true : false) : false,
                index: item.option_no,
                option: item.title
            }
        })

        return inputs;
    }

    const handleQuestionClick = (index: number) => {
        setCurrentQuestion(questionCompleteDetails[index]);
        let inputs = handleGetInputData(questionCompleteDetails[index]);
        setMultipleInputs(inputs)
    }

    const handleChangeQuestionStatus = async (questionId: string, index: number) => {

        // if(currentQuestion?.question_status !=='not_visited') {

        //     console.log('inside this',findQuestion)
        //     return;
        // }

        let findQuestion = questionCompleteDetails?.find((item: any) => {
            return item?._id == questionId
        })

        if (findQuestion) {
            setCurrentQuestion(findQuestion);
            let tmp = handleGetInputData(findQuestion);
            setMultipleInputs(tmp);
        }

        if (findQuestion?.question_status !== 'not_visited') {
            return;
        }




        let response = await updateQuestionStatusForMock(questionStatus[1], "", questionId, auth?.isAuthenticated());

        if (response.status == false) {
            setCurrentQuestion(response?.data);
            let temp = [...questionCompleteDetails];
            temp[index] = response.data;

            //category update
          

            let seperateCategory: any = {
                'answered': 0,
                'not_answered': 0,
                'not_visited': 0,
                'reviewed_not_answered': 0,
                'reviewed_and_answered': 0
            };

            for (let i = 0; i <temp?.length; i++) {
                seperateCategory[temp[i].question_status] += 1;
            }

            setAnswerCategory(seperateCategory);

            setQuestionCompleteDetails(temp)
            let tmp = handleGetInputData(response.data);
            setMultipleInputs(tmp);

        }
    }

    const handleReviewAndNextQuestion = async () => {




        let i = 0;

        let tempArr = [...questionCompleteDetails];

        while (i < tempArr?.length) {
            if (tempArr[i]?._id == currentQuestion?._id) {

                break;
            }

            i++;
        }

        // @ts-ignore
        // let formDetails = document.forms?.questionAnswerInputForm;

        // let formData = new FormData(formDetails);


        let solutionFetch = multipleInputs?.find((item) => {

            return item.checked == true
        })



        let response = await updateQuestionStatusForMock(questionStatus[solutionFetch == null ? 3 : 4], solutionFetch?.index?.toString() || "", currentQuestion?._id, auth?.isAuthenticated());

        if (response.status == false) {
            setCurrentQuestion(response?.data);
            let temp = [...questionCompleteDetails];
            temp[i] = response.data;


            let seperateCategory: any = {
                'answered': 0,
                'not_answered': 0,
                'not_visited': 0,
                'reviewed_not_answered': 0,
                'reviewed_and_answered': 0
            };

            for (let i = 0; i < temp?.length; i++) {
                seperateCategory[temp[i].question_status] += 1;
            }

            setAnswerCategory(seperateCategory);

            setQuestionCompleteDetails(temp)
            if (i + 1 !== tempArr?.length) {
                setCurrentQuestion(tempArr[i + 1])
                let tempData = handleGetInputData(tempArr[i + 1]);
                setMultipleInputs(tempData)

            } else {
                setCurrentQuestion(tempArr[0])
                setMultipleInputs(handleGetInputData(tempArr[0]))
                let tempData = handleGetInputData(tempArr[0]);
                setMultipleInputs(tempData);
            }



        }

    }

    const handleSaveAndNextQuestion = async () => {


        let i = 0;

        let tempArr = [...questionCompleteDetails];

        while (i < tempArr?.length) {
            if (tempArr[i]?._id == currentQuestion?._id) {
                break;
            }

            i++;
        }

        // @ts-ignore
        // let formDetails = document.forms?.questionAnswerInputForm;

        // let formData = new FormData(formDetails);

        let solutionFetch = multipleInputs?.find((item) => {

            return item.checked == true
        })


        let response = await updateQuestionStatusForMock(questionStatus[!solutionFetch ? 1 : 2], solutionFetch ? solutionFetch?.index?.toString() : "", currentQuestion?._id, auth?.isAuthenticated());

        if (response.status == false) {
            setCurrentQuestion(response?.data);
            let temp = [...questionCompleteDetails];
            temp[i] = response.data;

         

            let seperateCategory: any = {
                'answered': 0,
                'not_answered': 0,
                'not_visited': 0,
                'reviewed_not_answered': 0,
                'reviewed_and_answered': 0
            };

            for (let i = 0; i < temp?.length; i++) {
                seperateCategory[temp[i].question_status] += 1;
            }

            setAnswerCategory(seperateCategory);

            setQuestionCompleteDetails(temp)
            if (i + 1 !== tempArr?.length) {
                setCurrentQuestion(tempArr[i + 1])
                setMultipleInputs(handleGetInputData(tempArr[i + 1]))
            } else {
                setCurrentQuestion(tempArr[0])
                setMultipleInputs(handleGetInputData(tempArr[0]))
            }


        }
    }

    const handleClearResponse = async () => {

        let inputs = handleGetInputData(currentQuestion, "clear");
        setMultipleInputs(inputs)


    }

    return (
        <>
            <FullScreen handle={handle}>
                <section className='min-h-screen relative font-sans'>

                    <div className='h-[7vh] z-10 bg-black flex items-center justify-end' >
                        <div className='text-sm text-white px-5'>
                            <p>Question Paper</p>
                        </div>
                    </div>
                    {/* {console.log(currentQuestion)} */}
                    <section className='absolute bg-white flex top-[48px] left-0 right-0 bottom-0'>
                        <div className='w-5/6 relative min-w-[800px] border-r border-gray-300'>


                            <div className='h-[6.5vh] px-5 flex justify-between items-center bg-gray-100 w-full'>
                                <div className='w-28 h-7 rounded-sm flex justify-center bg-blue-500 text-white items-center'>
                                    <p>Group 1</p>
                                </div>
                                <button onClick={handle.enter} className='w-9 rounded flex text-white cursor-pointer justify-center items-center bg-[#337ab7] h-8'>
                                    <RxEnterFullScreen size={22} />
                                </button>
                            </div>
                            {/* Timer bar */}
                            <div className='h-[3.5vh] flex text-sm font-semibold justify-between px-5 items-center'>
                                <span>Section</span>
                               
                            </div>

                            {/* Sections Bar */}
                            <div className='h-[5vh] text-[0.9rem] border-b-2 shadow-xs flex px-5 border font-semibold border-gray-300'>

                            </div>
                            <div className='h-[5vh] px-5 border-b border-gray-300'>
                                <div className='text-orange-500 flex text-sm font-semibold pt-2'>Type: {currentQuestion?.question_type == 'mcq' ? "MCQ" : "TITA"} | Marks: <p className='text-green-800'>+{currentQuestion?.awarded_points}</p>&nbsp; -{currentQuestion?.negative_points}</div>
                            </div>


                            <section className='overflow-hidden' >
                                <div className='flex border-[1.5px] border-gray-300 my-2.5 mx-2 overflow-hidden'>
                                    <div style={{ height: height ? height - 270 : 480 }} className={`${currentQuestion?.question_view_type !== 'full' ? 'w-3/5' : 'w-0 hidden'}   dynamicheader px-3 pt-3 pb-16 text-[0.96rem] overflow-auto `}>

                                        {
                                            <FilterHtml htmlContent={currentQuestion?.primary_data} />
                                        }

                                    </div>
                                    <div className={`${currentQuestion?.question_view_type !== 'full' ? 'w-2/5' : 'w-full'}  overflow-auto min-h-[65vh] max-h-[70vh] px-1`}>
                                        <p className='text-[0.9rem] pl-1 font-semibold'>Question No.{currentQuestion?.question_count || 1}</p>
                                        <div className='h-[1.5px] bg-gray-300 my-1' />
                                        <div className='mt-5 text-[0.9rem] px-2.5'>
                                            {<FilterHtml htmlContent={currentQuestion?.question} />}
                                            <div className='mt-4 px-2.5'>
                                                <form id="questionAnswerInputForm" onSubmit={() => { }}>
                                                    <fieldset>

                                                        <div className='flex flex-col gap-y-6 items-start'>

                                                            {


                                                                currentQuestion?.access_type !== 'read_only' && multipleInputs?.map((inp: any) => {
                                                                    return (
                                                                        <div key={"opt" + inp.index} className='flex gap-x-3 '>
                                                                            <input
                                                                                type="radio"
                                                                                name="option"
                                                                                onChange={(e) => {
                                                                                    let temp = [...multipleInputs];
                                                                                    let finalTemp = temp?.map((data) => {
                                                                                        return {
                                                                                            ...data,
                                                                                            checked: false
                                                                                        }
                                                                                    });

                                                                                    finalTemp[inp.index - 1].checked = e.target.checked;
                                                                                    setMultipleInputs(finalTemp);
                                                                                }}

                                                                                checked={inp.checked} />
                                                                            {inp?.option ? inp?.option?.replace(regex, "") : <p>Option {inp.index}</p>}
                                                                        </div>
                                                                    )
                                                                })


                                                            }
                                                            <input id="formResetButton" type={"reset"} style={{ display: 'none' }} />

                                                        </div>

                                                    </fieldset>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className='absolute border-t border-gray-300 flex justify-between items-center right-0 left-0 bottom-0 h-12 px-3'>
                                <div className='flex gap-x-1'>
                                    <button onClick={handleReviewAndNextQuestion} type="button" className='flex justify-center text-[1.05rem] border-gray-400 border items-center w-56 bg-gray-200 h-9 rounded-sm'>
                                        <p>Mark For Review & Next</p>
                                    </button>
                                    <button onClick={handleClearResponse} type="button" className='flex justify-center border-gray-400 border items-center w-40 bg-gray-200 h-9 rounded-sm'>
                                        <p>Clear Response</p>
                                    </button>
                                </div>
                                <button type="button" onClick={handleSaveAndNextQuestion} className='flex justify-center border-gray-400 text-white border items-center w-36 bg-[#0c7cd5] h-9 rounded-sm'>
                                    <p>Save & Next</p>
                                </button>
                            </div>


                        </div>
                        <div className='w-1/6 '>
                            <div className='h-[108px] border-y border-r px-1 flex gap-x-2 border-gray-300'>
                                <Image src="/images/defaultAvatar.jfif" height={85} width={85} alt='user-avatar' className='shadow mt-1 bg-red-200' />

                                <p className='font-semibold text-[0.9rem] mt-1'>Bunsukh Fandgudu</p>
                            </div>
                            <div className='h-[8.2rem] border-l-[2px] border-black border-t-[2px]'>
                                <div className='grid grid-cols-2 gap-y-2.5 px-2 mt-2'>
                                    <div className='flex gap-x-2 '>
                                        <div className='spritegreen1 w-8 h-8 flex justify-center items-center text-[0.8rem]   text-white'>
                                            <p>0</p>
                                        </div>
                                        <p className='text-[0.72rem]'>Answered</p>
                                    </div>
                                    <div className='flex gap-x-2 '>
                                        <div className='spirtered1 w-8 h-8  flex justify-center items-center text-[0.8rem]  text-white'>
                                            <p>0</p>
                                        </div>
                                        <p className='text-[0.72rem]'>Not Answered</p>
                                    </div>



                                    <div className='flex gap-x-2 '>
                                        <div className='spritegrey1 w-8 h-8  flex justify-center items-center text-[0.8rem] text-black '>
                                            <p>0</p>
                                        </div>
                                        <p className='text-[0.72rem]'>Not Visited</p>
                                    </div>
                                    <div className='flex gap-x-2 '>
                                        <div className='spritepurple1  flex justify-center items-center text-[0.8rem] text-white'>
                                            <p>0</p>
                                        </div>
                                        <p className='text-[0.72rem]'>Marked For Review</p>
                                    </div>

                                </div>
                                <div className='flex gap-x-2 px-2 mt-2'>
                                    <div className='spritepurpletick1 flex justify-center items-center text-[0.8rem]  text-white'>
                                        <p>0</p>
                                    </div>
                                    <p className='text-[0.72rem]'>Answered & Marked For Review</p>
                                </div>
                            </div>
                            <div className='relative ' >
                                <div className='border-l-[2px] border-black bg-[#337ab7] h-8 text-white'>
                                    <p className='px-2 font-bold text-[0.9rem] pt-1'>Question</p>
                                </div>
                                <div className='bg-[#e5f6fd] border-l-[2px] border-b-[2px] border-black'>
                                    <p className='text-[0.85rem] font-semibold py-1 px-2'>Choose a Question</p>
                                    <div style={{ height: height ? height - 415 : 320 }} className='  grid grid-cols-4 gap-2.5 items-start justify-start  px-2.5 py-2.5 text-[0.9rem] overflow-auto '>

                                        {
                                            questionCompleteDetails?.map((item: any, questionCount: number) => {
                                                return (
                                                    <div onClick={() => { handleChangeQuestionStatus(item?._id, questionCount) }} key={item?._id} className={`flex   cursor-pointer text-[1.15rem] justify-center items-center ${handleAnswerToColor(item?.question_status)}`}>
                                                        <p>{questionCount + 1}</p>
                                                    </div>
                                                )
                                            })
                                        }



                                    </div>
                                </div>

                                <div className='h-16 bg-[#e5f6fd] flex justify-center items-center'>
                                    <button onClick={() => { router.push(`/question/solve/${params.questionId}/result`) }} className='flex justify-center items-center w-20 h-[2.2rem] bg-[#38aae9] text-white rounded-sm shadow-sm'>
                                        <p>Submit</p>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </section>
                </section>
            </FullScreen>
        </>
    )
}

export default QuestionsView