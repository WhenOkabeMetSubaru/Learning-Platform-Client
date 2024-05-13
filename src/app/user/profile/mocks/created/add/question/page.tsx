"use client"
import React, { useEffect, useState } from 'react'

import { getAllCategories } from '@/features/apiQueries/categoryapi';

import auth from '@/features/authentication/auth';
import Link from 'next/link';
import { addNewBundleByUser, getPendingBundleByUser } from '@/features/apiQueries/bundleapi';
import { getAllQuestionsByBundle } from '@/features/apiQueries/questionapi';
import { handleAddQuestionResponse } from '@/app/user/profile/questions/created/add/addapicomponent';
import { useRouter } from 'next/navigation';
// import { Editor } from '@/components/richTextEditor/Editor';

import { AiFillDelete } from 'react-icons/ai';
import { notification } from 'antd';
import { useIsMounted } from '@/components/customhooks/useIsMounted';

import dynamic from 'next/dynamic';
const Editor = dynamic(() => import("@/components/richTextEditor/Editor").then((obj) => obj.Editor)
)


const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const AddNewQuestionMultiple = () => {

    const [categoryData, setCategoryData] = useState([]);

    const [bundleData, setBundleData] = useState("");
    const [bundleQuestion, setBundleQuestions] = useState([]);
    const [tab, setTab] = useState<string>('main');
    const isMounted = useIsMounted();
    const router = useRouter();

    useEffect(() => {
        async function fetchCategory() {
            let data = await getAllCategories();
            setCategoryData(data?.data);
        }

        fetchCategory()

        const url = new URL(window.location.href);
        let bundleId = url.searchParams.get('bundleId');

        // async function fetchPendingBundle() {
        //     let data = await getPendingBundleByUser()

        //     if (data.status == true) {
        //         let finalData = await addNewBundleByUser();
        //         if (finalData.status == false) {
        //             return finalData.data._id;
        //         }
        //     }

        //     return data.data._id;
        // }

        // if (!bundleId) {
        //     fetchPendingBundle().then((id: string) => {
        //         bundleId = id;
        //         fetchQuestionsByBundle(id);
        //         url.searchParams.set('bundleId', id);
        //         setBundleData(id);
        //         window.history.replaceState(null, "", url);
        //     })

        // }


        if (bundleId) {
            // fetchQuestionsByBundle(bundleId);
        } else {
            router.push("/user/profile/mocks/created/add");
        }



    }, [])

    useEffect(()=>{

    },[])

    const [mainDetails, setMainDetails] = useState({
        question: "",
        answer_explanation: "",
        primary_data: ""
    });



    const [options, setOptions] = useState(
        {
            select_options: [
                {
                    option: "",
                    status: false,
                    no: 1
                },
                {
                    option: "",
                    status: false,
                    no: 2
                },
                {
                    option: "",
                    status: false,
                    no: 3
                },
                {
                    option: "",
                    status: false,
                    no: 4
                }
            ]
        }
    )

    const [questionDetails, setQuestionDetails] = useState({ question_topic: "", question_view_type: "full", category: "", awarded_points: 0, negative_points: 0, question_type: "mcq", difficulty: "easy", question_timer_solo: 0 })

    const handleAddQuestion = async () => {

        let item = options.select_options?.find((item, i) => item.status == true)

        let finalOptions = options?.select_options?.map((itr) => {
            return {
                question_no: itr.no,
                title: itr.option
            }
        })


        const url = new URL(window.location.href);
        let bundleId = url.searchParams.get('bundleId');

        let isAnswerSelected = options.select_options?.find((item: any) => {
            return item.status == true
        })

        if (!isAnswerSelected) return notification.error({ message: "No Answer Selected" })

        let finalDetails = {
            options: finalOptions,
            correct_answer: item?.no,
            ...questionDetails,
            ...mainDetails,
            bundle: bundleId,
            access_type: "mock_only"

        }

      

        let response = await handleAddQuestionResponse(finalDetails, auth.isAuthenticated());

        if (response.status == false) {
            return notification.success({ message: response.info })
        }


       
    }

    async function fetchQuestionsByBundle(bundleId: any) {
        let data = await getAllQuestionsByBundle(bundleId);
        if (data.status == false) {
            setBundleQuestions(data.data);
        }
    }

    return (
        isMounted() === true && 
        <section>
            <header className='h-16 w-full left-0 flex justify-between px-3 items-center right-0 top-0 shadow'>
                <div>
                    <Link href={"/"}><div className='w-40 h-10 rounded bg-red-200 cursor-pointer' /></Link>
                </div>
                <div>
                    <button onClick={handleAddQuestion} className='w-32 h-10 hover:bg-purple-700 bg-purple-600 text-white flex justify-center rounded items-center'><p>Save</p></button>
                </div>
            </header>
            {

                // tab == 'main' ?
                //     <section className='p-5'>
                //         <p className='text-lg font-semibold'>Add Multiple Questions to a Set</p>
                //         <div className='mt-5 flex flex-col gap-y-2'>
                //             {
                //                 bundleQuestion?.map((item: any, i) => {
                //                     return (
                //                         <div key={item?._id} className='shadow flex justify-center items-center bg-green-200 h-10 rounded'>
                //                             <p>Question {i + 1}</p>
                //                         </div>
                //                     )
                //                 })
                //             }

                //         </div>
                //         <button onClick={() => setTab('question')} className=' w-full hover:bg-gray-50 mt-5 flex justify-center items-center border h-12 rounded'>
                //             <p>Add Question</p>
                //         </button>

                //     </section> :

                <section className='flex'>


                    <div className='w-1/4 border bg-gray-50 px-3 py-6 '>
                        <p>Add a Question</p>
                        <div className='flex gap-x-2 mt-2 items-center w-full'>
                            <span className='w-1/2'>
                                <p className='text-sm p-1'>Marks</p>
                                <input value={questionDetails.awarded_points} onChange={(e) => setQuestionDetails({ ...questionDetails, awarded_points: +e.target.value })} className='bg-white px-2 outline-none border rounded w-full h-10' />
                            </span>
                            <span className='w-1/2'>
                                <p className='text-sm p-1'>Negative Marks</p>
                                <input value={questionDetails.negative_points} onChange={(e) => setQuestionDetails({ ...questionDetails, negative_points: +e.target.value })} className='bg-white px-2 outline-none border rounded w-full h-10' />
                            </span>
                        </div>
                        <div className='mt-3'>
                            <label className='text-[0.8rem] p-1'>Question Type</label>
                            <select value={questionDetails.question_type} onChange={(e) => setQuestionDetails({ ...questionDetails, question_type: e.target.value })} className='outline-none border w-full h-10 rounded'>
                                <option key={0} value="mcq">MCQ</option>
                                <option key={1} value="tita">Tita</option>

                            </select>
                        </div>
                        <div className='mt-3'>
                            <label className='text-[0.8rem] p-1'>Difficulty</label>
                            <select value={questionDetails.difficulty} onChange={(e) => setQuestionDetails({ ...questionDetails, difficulty: e.target.value })} className='outline-none border w-full h-10 rounded'>
                                <option key={0} value="easy">Easy</option>
                                <option key={1} value="moderate">Moderate</option>
                                <option key={2} value="difficult">Difficult</option>
                            </select>
                        </div>
                        <div className='mt-5'>
                            <div className='flex items-center gap-x-1'>
                                <input type="checkbox" />
                                <p>Timer</p>
                            </div>
                            <div>
                                <label className='text-[0.8rem]'>Minutes</label>
                                <input value={questionDetails.question_timer_solo} onChange={(e) => setQuestionDetails({ ...questionDetails, question_timer_solo: +e.target.value })} className='outline-none border w-full h-10 rounded px-2' />
                            </div>
                        </div>
                        <div className='mt-3'>
                            <label className='text-[0.8rem] p-1'>Category</label>
                            <select value={questionDetails.category} onChange={(e) => setQuestionDetails({ ...questionDetails, category: e.target.value })} className='outline-none border w-full h-10 rounded'>
                                <option key={0} value="">None</option>
                                {
                                    categoryData?.map((categoryItem: any) => {
                                        return (
                                            <option key={categoryItem?._id} value={categoryItem?._id} >{categoryItem?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-3'>
                            <label className='text-[0.8rem] p-1'>Question View Type</label>
                            <select value={questionDetails.question_view_type} onChange={(e) => setQuestionDetails({ ...questionDetails, question_view_type: e.target.value })} className='outline-none border w-full h-10 rounded'>
                                <option key={0} value="full">Full</option>
                                <option key={1} value="half">Half</option>

                            </select>
                        </div>
                        <div className='mt-3'>
                            <label className='text-[0.8rem] p-1'>Question Topic</label>
                            <select value={questionDetails.question_topic} onChange={(e) => setQuestionDetails({ ...questionDetails, question_topic: e.target.value })} className='outline-none border w-full h-10 rounded'>
                                <option key={0} value="">None</option>
                                {
                                    categoryData?.map((categoryItem: any) => {
                                        return (
                                            <option key={categoryItem?._id} value={categoryItem?._id} >{categoryItem?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>



                    </div>
                    <div className='w-3/4 p-4'>
                        <div>
                            <label className='text-[0.85rem] py-2'>Instruction</label>
                            <Editor index={1} placeholder='Enter Here' value={mainDetails.primary_data} onChange={(e: any) => setMainDetails({ ...mainDetails, primary_data: e })} />
                            {/* <ReactQuill placeholder='Enter Here' formats={formats} modules={modules} theme="snow" value={mainDetails.primary_data} onChange={(e) => setMainDetails({ ...mainDetails, primary_data: e })} /> */}
                        </div>
                        <div>
                            <label className='text-[0.85rem] py-2'>Question</label>
                            <Editor index={2} placeholder='Enter your question here' value={mainDetails.question} onChange={(e: any) => setMainDetails({ ...mainDetails, question: e })} />
                        </div>
                        <div className=' pt-5 w-full'>
                            <label className=' text-[0.9rem]'>Choices</label>
                            <div className='flex flex-col gap-y-10'>
                                {
                                    options?.select_options?.map((opt, i) => {
                                        return (
                                            <div key={i + 3} className='flex items-center gap-x-2'>
                                                <input checked={opt.status} type="checkbox" onChange={(e) => { let temp = [...options.select_options]; for (let i = 0; i < temp.length; i++) { temp[i].status = false; } temp[i].status = e.target.checked; setOptions({ ...options, select_options: temp }) }} />
                                                <p>{alphabets[i]}</p>
                                                <Editor index={i + 3} placeholder='Enter Here' value={opt.option} onChange={(e: any) => { let temp = [...options.select_options]; temp[i].option = e; setOptions({ ...options, select_options: temp }); }} />
                                                <AiFillDelete color="red" size={22} className='cursor-pointer' />
                                            </div>
                                        )
                                    })

                                }
                                <button onClick={() => {
                                    let tempOptions = [...options.select_options];
                                    let finalQuestionNumber = tempOptions[tempOptions?.length - 1]?.no
                                    let obj = {
                                        option: "",
                                        status: false,
                                        no: finalQuestionNumber + 1
                                    }

                                    tempOptions.push(obj);
                                    setOptions({ select_options: tempOptions })

                                }} className='mt-3 h-10 w-36 rounded bg-blue-700 text-white flex justify-center items-center'>Add Option</button>
                            </div>

                        </div>
                        <div className='mt-5'>
                            <label className='text-[0.85rem] py-2'>Answer Explanation</label>
                            <Editor index={100} placeholder='Enter your explanation here' value={mainDetails.answer_explanation} onChange={(e: any) => setMainDetails({ ...mainDetails, answer_explanation: e })} />
                        </div>

                    </div>

                    {/* <div className='p-3 mt-3'>
                <p className='my-2'>Question*</p>
                <ReactQuill  formats={formats} modules={modules} theme="snow" value={value} onChange={setValue} />
            </div>
             */}


                </section>
            }
        </section>
    )
}

export default AddNewQuestionMultiple


// let modules = {
//     toolbar: [
//         [{ 'header': [1, 2, false] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//         ['link', 'image', 'formula'],
//         ['clean']
//     ],
// }

// let formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "align",
//     "strike",
//     "script",
//     "blockquote",
//     "background",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "color",
//     "code-block"
// ]

