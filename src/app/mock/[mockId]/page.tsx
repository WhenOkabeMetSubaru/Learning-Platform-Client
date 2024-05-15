'use client'
import useWindowDimensions from '@/components/customhooks/useDimensionHook'
import { handleAnswerToColor, questionStatus } from '@/components/extrafunction'
import FilterHtml from '@/components/unknownHtml'
import { getAllDetailsAboutMock, getLatestBundlesDataByMockUser, updateMockBundleNextStatus, updateMockBundleSubmit } from '@/features/apiQueries/mockapai'
import { updateQuestionStatusForMock } from '@/features/apiQueries/questionapi'
import auth from '@/features/authentication/auth'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BsInfoCircleFill } from "react-icons/bs";
import CountdownTimer from '../../../components/utils/TimerComponent'
import { Modal } from 'antd'
import { RxEnterFullScreen } from 'react-icons/rx'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { UserAuthFinal } from '@/features/contextApi/userAuthProvider'


let demo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

const Home: NextPage = () => {

    const regex = /(<([^>]+)>)/gi;
    const handle = useFullScreenHandle()


    let { height } = useWindowDimensions();

    const params = useParams();
    const {currentUser}:any  = UserAuthFinal()


    const [bundleDetails, setBundleDetails] = useState<any>([]);
    const [questionDetails, setQuestionDetails] = useState<any>({});
    const [currentSection, setCurrentSection] = useState<any>({});
    const [currentQuestion, setCurrentQuestion] = useState<any>({})
    const [multipleInputs, setMultipleInputs] = useState<any>([]);
    const [multipleTimer, setMultipleTimer] = useState<any>([]);
    const router = useRouter()

    const bundldeDetailsRef = useRef<any>([]);
    const timerRef = useRef<any>(null);

    const [submitBox, setSubmitBox] = useState(false);
    const [loaderBox, setLoaderBox] = useState(false);
    const [nextSectionBox, setNextSectionBox] = useState(false)


    useEffect(() => {
        setLoaderBox(true);
        getAllDetailsAboutMock({ mockId: params?.mockId, token: auth?.isAuthenticated() }).then((res: any) => {
            if (res.status == false) {
                setBundleDetails(res.data?.bundleDetails);
                bundldeDetailsRef.current = res?.data?.bundleDetails;

                let bundleTemp = res?.data?.bundleDetails;

                let tempTimer = bundleTemp?.map((item: any) => {

                    let timer1 = new Date(item?.section_start_time);
                    let timer2 = new Date(item?.section_end_time)

                    return {
                        start_time: timer1,
                        end_time: timer2
                    }
                })

                setMultipleTimer(tempTimer);
                tempTimer.ref = tempTimer;

                let x = 0;
                while (x < length) {
                    let currentTime = new Date();
                    let start = tempTimer[x]?.start_time;
                    let end = tempTimer[x]?.end_time;
                    if (start < currentTime && end < currentTime) {
                        x++
                    } else if (start <= currentTime && end > currentTime) {
                        break;
                    }

                }




                setQuestionDetails(res?.data?.questionDetails);

                let findCorrectSection = res?.data?.bundleDetails?.find((item: any) => {
                    return item?.is_submitted == false;
                })

                if(!findCorrectSection){
                    return router.push(`/mock/${params.mockId}/result`)
                }else{
                    setCurrentSection(findCorrectSection);
                    let tempQuestion = res?.data?.questionDetails[findCorrectSection?._id][0];
                    setCurrentQuestion(tempQuestion);

                    let inputs = tempQuestion?.options?.map((item: any, i: number) => {
                        return {
                            checked: tempQuestion?.user_answer == (i + 1)?.toString() ? true : false,
                            index: item.option_no,
                            option: item.title
                        }
                    })


                    setMultipleInputs(inputs)
                }

                
            }

            setLoaderBox(false);
        })




    }, [])

    useEffect(() => {

    }, [bundleDetails, currentSection, currentQuestion, multipleTimer])


    const handleChangeQuestionStatus = async (questionId: string, index: number) => {

        // if(currentQuestion?.question_status !=='not_visited') {

        //     console.log('inside this',findQuestion)
        //     return;
        // }

        let findQuestion = questionDetails[currentSection?._id]?.find((item: any) => {
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
            let temp = { ...questionDetails };
            temp[currentSection?._id][index] = response.data;
            setQuestionDetails(temp)
            let tmp = handleGetInputData(response.data);
            setMultipleInputs(tmp);

        }
    }

    const handleReviewAndNextQuestion = async () => {




        let i = 0;

        let tempArr = questionDetails[currentSection?._id];

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
            let temp = { ...questionDetails };
            temp[currentSection?._id][i] = response.data;
            setQuestionDetails(temp)
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

        let tempArr = questionDetails[currentSection?._id];

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
            let temp = { ...questionDetails };
            temp[currentSection?._id][i] = response.data;
            setQuestionDetails(temp)
            if (i + 1 !== tempArr?.length) {
                setCurrentQuestion(tempArr[i + 1])
                setMultipleInputs(handleGetInputData(tempArr[i + 1]))
            } else {
                setCurrentQuestion(tempArr[0])
                setMultipleInputs(handleGetInputData(tempArr[0]))
            }


        }




    }


    const handleAnswerSubmit = async (e: any) => {
        e.preventDefault();
        // console.log(selectedButton)
        // let formNew = new FormData(e.target);

        // let tempArr = questionDetails[currentSection];

        // let i = selectedQuestionButton?.index;


        // console.log(selectedQuestionButton)
        // if (formNew.get('options') !== null && selectedQuestionButton?.btnType == 'SaveAndNext') {

        // } else if (selectedQuestionButton?.btnType == 'ReviewAndNext') {
        //     console.log('inside')

        // }
    }

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


    const handleClearResponse = async () => {

        let inputs = handleGetInputData(currentQuestion, "clear");
        setMultipleInputs(inputs)


    }

    const handleCheckCurrentSection = (length: any, tempTimer: any) => {
        let x = 0;
        console.log('Whole Wheat ', length, tempTimer)
        while (x < length) {
            let currentTime = new Date();
            let start = tempTimer[x]?.start_time;
            let end = tempTimer[x]?.end_time;
            if (start < currentTime && end < currentTime) {
                x++
            } else if (start <= currentTime && end > currentTime) {
                break;
            }

        }

        return x;
    }



    const handleChangeSection = async () => {


        let bundleResponse = await getLatestBundlesDataByMockUser({mockId:params.mockId})
        let latestBundleData = bundleResponse?.status==false?bundleResponse?.data:bundldeDetailsRef?.current;

        let latestCurrentSection = latestBundleData?.find((item: any) => {
            return item?.is_submitted == false
        })



        let res = await updateMockBundleSubmit(latestCurrentSection?._id, auth?.isAuthenticated());

        if (res.status == false) {

            let sectionData = bundldeDetailsRef?.current;
            if (sectionData[sectionData?.length - 1]?._id == latestCurrentSection?._id) {
                return router.push(`/mock/${params.mockId}/result`);

            }


            let i = 0;
            while (i < bundleDetails?.length) {
                if (bundleDetails[i]?._id !== latestCurrentSection?._id) {
                    i++;
                }
                break;
            }


            bundleResponse = await getLatestBundlesDataByMockUser({ mockId: params.mockId })
            latestBundleData = bundleResponse?.status == false ? bundleResponse?.data : bundldeDetailsRef?.current;
            let copySections = [...latestBundleData];
            copySections[i] = res?.data;


            let latestPendingSection;


            if (i + 1 !== bundleDetails?.length) {
                latestPendingSection = copySections?.find((item: any) => {
                    return item?.is_submitted == false
                })
            }

            let nextBundleResponse = await updateMockBundleNextStatus(latestPendingSection._id, auth?.isAuthenticated());

            if (nextBundleResponse?.status == false) {


                let flagIndex = 0;
                while (flagIndex < copySections?.length) {
                    if (latestPendingSection?._id == copySections[flagIndex]?._id) {
                        break;
                    }
                    flagIndex++;
                }


                copySections[flagIndex] = nextBundleResponse?.data;
                setBundleDetails(copySections);
                bundldeDetailsRef.current = copySections;


                let findCorrectSection = copySections?.find((item: any) => {
                    return item?.is_submitted == false;
                })

                setCurrentSection(findCorrectSection);

              

                let tempTimer = copySections?.map((item: any) => {

                    let timer1 = new Date(item?.section_start_time);
                    let timer2 = new Date(item?.section_end_time)

                    return {
                        start_time: timer1,
                        end_time: timer2
                    }
                })


                setMultipleTimer(tempTimer);
                timerRef.current = tempTimer;

                let x = 0;
                while (x < length) {
                    let currentTime = new Date();
                    let start = tempTimer[x]?.start_time;
                    let end = tempTimer[x]?.end_time;
                    if (start < currentTime && end < currentTime) {
                        x++
                    } else if (start <= currentTime && end > currentTime) {
                        break;
                    }

                }



                let tempQuestion = questionDetails[findCorrectSection?._id][0];
                setCurrentQuestion(tempQuestion);

                setSubmitBox(false);

                setLoaderBox(true);

                let inputs = tempQuestion?.options?.map((item: any, i: number) => {
                    return {
                        checked: tempQuestion?.user_answer == (i + 1)?.toString() ? true : false,
                        index: item.option_no,
                        option: item.title
                    }
                })


                setMultipleInputs(inputs)
                setMultipleTimer(tempTimer);

            }


        }

        setSubmitBox(false);
        setLoaderBox(false);

    }

    const handleSectionSubmit = async () => {

        let latestCurrentSection = bundldeDetailsRef?.current?.find((item: any) => {
            return item?.is_submitted == false
        })


        let res = await updateMockBundleSubmit(latestCurrentSection?._id, auth?.isAuthenticated());

        if (res.status == false) {

            let sectionData = bundldeDetailsRef?.current;
            if (sectionData[sectionData?.length - 1]?._id == latestCurrentSection?._id) {
                return router.push(`/mock/${params.mockId}/result`);

            }

            let i = 0;
            while (i < bundleDetails?.length) {
                if (bundleDetails[i]?._id !== currentSection?._id) {
                    i++;
                }
                break;
            }


            let tempSection = [...bundleDetails];
            tempSection[i] = res?.data;

            let tempTimer:any = tempSection?.map((item: any,count:number) => {

                let timer1 = new Date(item?.section_start_time);
                let timer2 = new Date(item?.section_end_time)

                return {
                    start_time: count<=i?null:timer1,
                    end_time: count<=i?null:timer2
                }
            })

           tempTimer[i].start_time = "";
           tempTimer[i].end_time = "";
          

            setMultipleTimer(tempTimer);
            timerRef.current = tempTimer;

          

            setBundleDetails(tempSection);

            setLoaderBox(false);


        }

        setSubmitBox(false);
        setLoaderBox(false);
        setNextSectionBox(true);
    }

    const handleNextSection = async () => {


        let latestBundlesData = await getLatestBundlesDataByMockUser({mockId:params.mockId})
        let copySections = latestBundlesData?.status==false?latestBundlesData?.data : bundldeDetailsRef?.current;

        let latestPendingSection = copySections?.find((item: any) => {
            return item?.is_submitted == false
        });
        console.log(copySections,latestPendingSection)

        let nextBundleResponse = await updateMockBundleNextStatus(latestPendingSection._id, auth?.isAuthenticated());

        if (nextBundleResponse?.status == false) {


            let flagIndex = 0;
            while (flagIndex < copySections?.length) {
                if (latestPendingSection?._id == copySections[flagIndex]?._id) {
                    break;
                }
                flagIndex++;
            }


            copySections[flagIndex] = nextBundleResponse?.data;
            setBundleDetails(copySections);
            bundldeDetailsRef.current = copySections;


            let findCorrectSection = copySections?.find((item: any) => {
                return item?.is_submitted == false;
            })

            setCurrentSection(findCorrectSection);



            let tempTimer:any = copySections?.map((item: any,count:number) => {

                let timer1 = new Date(item?.section_start_time);
                let timer2 = new Date(item?.section_end_time)

                return {
                    start_time:count<flagIndex?null: timer1,
                    end_time:count<flagIndex?null: timer2
                }
            })


            

            setMultipleTimer(tempTimer);
            timerRef.current = tempTimer;

            let x = 0;
            while (x < length) {
                let currentTime = new Date();
                let start = tempTimer[x]?.start_time;
                let end = tempTimer[x]?.end_time;
                if (start < currentTime && end < currentTime) {
                    x++
                } else if (start <= currentTime && end > currentTime) {
                    break;
                }

            }



            let tempQuestion = questionDetails[findCorrectSection?._id][0];
            setCurrentQuestion(tempQuestion);

            setSubmitBox(false);

            setLoaderBox(true);

            let inputs = tempQuestion?.options?.map((item: any, i: number) => {
                return {
                    checked: tempQuestion?.user_answer == (i + 1)?.toString() ? true : false,
                    index: item.option_no,
                    option: item.title
                }
            })


            setMultipleInputs(inputs)
            setMultipleTimer(tempTimer);
            setNextSectionBox(false);

        }


        setLoaderBox(false);
        setNextSectionBox(false);

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
                                <div onClick={handle.enter} className='w-9 rounded-sm flex text-white cursor-pointer justify-center items-center bg-[#337ab7] h-8'>
                                    <RxEnterFullScreen size={22} />
                                </div>
                            </div>
                            {/* Timer bar */}
                            <div className='h-[3.5vh] flex text-sm font-semibold justify-between px-5 items-center'>
                                <span>Section</span>
                                {/* <span className='font-bold'>Time Left: 2 : 49 : 22</span> */}
                                {
                                    multipleTimer?.map((timerItem: any, i: any) => {
                                        let currentTime = new Date();
                                        
                                        return  (timerItem?.start_time <= currentTime) && (currentTime <= timerItem?.end_time) && <CountdownTimer func={handleChangeSection} setMultipleTimer={setMultipleTimer} multipleTimer={multipleTimer} key={i} initialDate={timerItem?.end_time} />
                                    })
                                }
                            </div>

                            {/* Sections Bar */}
                            <div className='h-[5vh] text-[0.9rem] border-b-2 shadow-xs flex px-5 border font-semibold border-gray-300'>

                                {
                                    bundleDetails?.map((bundle: any, idx: number) => {
                                        return (
                                            <div key={bundle?._id} className={`flex ${idx == 0 ? 'border-l-2' : ''} border-r-2 ${currentSection?._id == bundle?._id ? 'text-white bg-[#337ab7]' : 'text-[#337ab7] bg-white'}  border-gray-300 px-4 font-semibold justify-center items-center`}>
                                                <div className='flex gap-x-1 items-center'>
                                                    <p>{bundle?.title}</p>
                                                    <BsInfoCircleFill color={currentSection?._id !== bundle?._id ? "#337ab7" : 'white'} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
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
                                                <form id="questionAnswerInputForm" onSubmit={handleAnswerSubmit}>
                                                    <fieldset>

                                                        <div className='flex flex-col gap-y-6 items-start'>

                                                            {
                                                                // currentQuestion?.options?.map((option: any, optCount: number) => {
                                                                //     return (
                                                                //         <div key={"opt" + optCount} className='flex gap-x-3 '>
                                                                //             <input
                                                                //                 type="radio"
                                                                //                 name="option"
                                                                //                 value={`option${optCount + 1}`} />
                                                                //             {option?.title ? option?.title?.replace(regex, "") : <p>Option {optCount}</p>}
                                                                //         </div>
                                                                //     )
                                                                // })

                                                                multipleInputs?.map((inp: any) => {
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
                                    <button type="button" onClick={handleReviewAndNextQuestion} className='flex justify-center text-[1.05rem] border-gray-400 border items-center w-56 bg-gray-200 h-9 rounded-sm'>
                                        <p>Mark For Review & Next</p>
                                    </button>
                                    <button type="button" onClick={handleClearResponse} className='flex justify-center border-gray-400 border items-center w-40 bg-gray-200 h-9 rounded-sm'>
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

                                <p className='font-semibold text-[0.9rem] mt-1'>{currentUser?.name}</p>
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
                                    <p className='px-2 font-bold text-[0.9rem] pt-1'>{currentSection?.title}</p>
                                </div>
                                <div className='bg-blue-100 border-l-[2px] border-b-[2px] border-black'>
                                    <p className='text-[0.85rem] font-semibold py-1 px-2'>Choose a Question</p>
                                    <div style={{ height: height ? height - 415 : 320 }} className='  grid grid-cols-4 gap-2.5 items-start justify-start  px-2.5 py-2.5 text-[0.9rem] overflow-auto '>

                                        {
                                            questionDetails[currentSection?._id]?.map((item: any, questionCount: number) => {
                                                return (
                                                    <div onClick={() => { handleChangeQuestionStatus(item?._id, questionCount) }} key={item?._id} className={`flex   cursor-pointer text-[1.15rem] justify-center items-center ${handleAnswerToColor(item?.question_status)}`}>
                                                        <p>{questionCount + 1}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* {console.log(questionDetails[currentSection])} */}


                                    </div>
                                </div>

                                <div className='h-16 bg-blue-100 flex justify-center items-center'>
                                    <button onClick={() => setSubmitBox(true)} className='flex justify-center items-center w-20 h-[2.2rem] bg-[#38aae9] text-white rounded-sm shadow-sm'>
                                        <p>Submit</p>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </section>
                </section>

                <Modal footer={
                    <div className='flex gap-x-2 justify-end'>
                        <button onClick={handleSectionSubmit} className='flex justify-center items-center font-semibold bg-lime-600 text-white rounded w-28 h-8'>
                            <p>Submit Mock</p>
                        </button>
                        <button onClick={() => { setSubmitBox(false) }} className='flex justify-center items-center font-semibold border bg-red-600 rounded w-20 text-white h-8'>
                            <p>Close</p>
                        </button>
                    </div>
                } open={submitBox} onCancel={() => { setSubmitBox(false) }} title={<p className='text-lg font-normal absolute top-3 left-5'>Are you Sure?</p>} >
                    <hr className='absolute right-0 left-0 top-14' />
                    <hr className='absolute right-0 left-0 bottom-16' />
                    <p className=' mt-12 mb-10 font-semibold'>Are you sure you want to submit the mock?</p>
                </Modal>

                <Modal footer="" open={loaderBox} onCancel={() => { setLoaderBox(false) }} title={<p className='text-lg font-normal absolute top-3 left-6'>Loading the mock</p>} >
                    <hr className='absolute right-0 left-0 top-14' />
                    <hr className='absolute right-0 left-0 bottom-6' />
                    <p className=' mt-12 mb-10 font-semibold'>Questions loaded. Setting up the exam interface...</p>
                </Modal>

                <Modal width={600} footer={
                    <div className='flex gap-x-2 justify-end'>
                        <button onClick={handleNextSection} className='flex justify-center items-center font-semibold bg-[#449d44] text-white rounded w-44 h-8'>
                            <p>Start Next Section</p>
                        </button>
                        <button onClick={() => { setNextSectionBox(false); router.push("/") }} className='flex justify-center items-center font-semibold border bg-red-600 rounded w-28 text-white h-8'>
                            <p>Close Mock</p>
                        </button>
                    </div>
                } open={nextSectionBox} onCancel={() => { setNextSectionBox(false) }} title={<p className='text-lg font-normal absolute top-3 left-5'>Start Next Section?</p>} >
                    <hr className='absolute right-0 left-0 top-14' />
                    <hr className='absolute right-0 left-0 bottom-16' />
                    <p className=' mt-12 mb-10 font-semibold text-sm'>Your attempt for this section is successfully submitted. You can now take a break before starting next section. Do you want to start the next section now?</p>
                </Modal>
            </FullScreen>
        </>
    )
}

export default Home
