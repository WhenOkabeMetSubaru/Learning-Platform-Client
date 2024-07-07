'use client'
// import UserLayout from '@/app/layout/userLayout';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



import React, { useEffect, useState } from 'react'
import { getAllCategories, getAllParentCategories, getAllSubCategories } from '@/features/apiQueries/categoryapi';
import { handleAddQuestionResponse } from './addapicomponent';
import auth from '@/features/authentication/auth';
// import { Editor } from '@/components/richTextEditor/Editor';
 
import { useParams, useSearchParams } from 'next/navigation';
import { Input, notification } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useIsMounted } from '@/components/customhooks/useIsMounted';
import { getQuestionByID } from '@/features/apiQueries/questionapi';

const Editor = dynamic(()=>import("@/components/richTextEditor/Editor").then((obj)=>obj.Editor)
)

const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']



const AddNewQuestion = () => {

    const [categoryData, setCategoryData] = useState([]);
    const [parentCategoryData,setParentCategoryData]  = useState<any>([]);
    const [childCategoryData,setChildCategoryData] = useState([]);
    const urlParams = useSearchParams();
    const  [parentId,setParentId] = useState<any>(null);

    const isMounted = useIsMounted()

    const [mainDetails, setMainDetails] = useState({
        question: "",
        answer_explanation: "",
        primary_data: "",
        title: ""
    });
    const [questionDetails, setQuestionDetails] = useState({ access_type: "single", question_topic: "", question_view_type: "half", category: "", awarded_points: 0, negative_points: 0, question_type: "mcq", difficulty: "easy", question_timer_solo: 0 })

    useEffect(() => {
        async function fetchCategory() {
            let data = await getAllCategories();
            setCategoryData(data?.data);
            let parentData = await getAllParentCategories();
         
            setParentCategoryData(parentData?.data);
           
        }

        const searchParams = new URLSearchParams(urlParams);
        setParentId(searchParams?.get('parentId') || "");

        if(searchParams?.get('parentId')){
            getQuestionByID(searchParams.get('parentId')!).then((res)=>{
                if(res.status ===false){
                    setMainDetails({...mainDetails,primary_data:res?.data?.primary_data})
                }
            })
        }
       
   

        fetchCategory()
    }, [])

   

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



    const handleAddQuestion = async () => {

        let item = options.select_options?.find((item, i) => item.status == true)

        let finalOptions = options?.select_options?.map((itr) => {
            return {
                option_no: itr.no,
                title: itr.option
            }
        })

        let isAnswerSelected = options.select_options?.find((item:any)=>{
            return item.status==true
        })

        if(!isAnswerSelected) return notification.error({message:"No Answer Selected"})

        let finalDetails:any = {
            options: finalOptions,
            correct_answer: item?.no,
            ...questionDetails,
            ...mainDetails,

        }
       
       
        if(parentId){
            
            finalDetails = {
                ...finalDetails,
                parentId:parentId,
                access_type:"multi_child"
            }
        }

        let response = await handleAddQuestionResponse(finalDetails, auth.isAuthenticated());

        if(response.status==false){
            return notification.success({message:response.info})
        }
    }

    const handleSubCategoryData  = async(id:string)=>{
        let data = await getAllSubCategories(id);

        if(data?.data){
            setChildCategoryData(data?.data);
        }
    }

    return (
       isMounted()==true &&
        <section>
            <header className='h-16 w-full left-0 flex justify-between px-3 items-center right-0 top-0 shadow'>
                <Link href="/">
                    <div className='text-xl font-semibold '>
                        TEST FEVER
                    </div>
                </Link>
                <div>
                    <button onClick={handleAddQuestion} className='w-32 h-10 hover:bg-purple-700 bg-purple-600 text-white flex justify-center rounded items-center'><p>Save</p></button>
                </div>
            </header>
            <section className='flex'>
                {/* <p className='text-xl'>Add a New Question</p> */}
                {/* <div className='mt-3 flex text-[0.85rem] flex-wrap gap-5'>
                <div className='w-64 cursor-pointer flex justify-center items-center bg-red-200 h-20 hover:shadow-md duration-300 rounded-sm'>
                    <p>Single Question</p>
                </div>
                <div className='w-64 cursor-pointer flex justify-center items-center bg-red-200 h-20 hover:shadow-md duration-300 rounded-sm'>
                    Paragraph + Multiple Questions(set)
                </div>
                <div className='w-64 cursor-pointer flex justify-center items-center bg-red-200 h-20 hover:shadow-md duration-300 rounded-sm'>
                    Multiple Questions(set)
                </div>
            </div> */}


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
                    {
                        !parentId ? <div className='mt-3'>
                            <label className='text-[0.8rem] p-1'>Type</label>
                            <select value={questionDetails.access_type} onChange={(e) => setQuestionDetails({ ...questionDetails, access_type: e.target.value })} className='outline-none border w-full h-10 rounded'>
                                <option key={0} value="single">Single</option>
                                <option key={1} value="read_only">Read-only</option>
                                <option key={2} value="multiple">Multiple</option>

                            </select>
                        </div> : <></>
                    }
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
                        <select value={questionDetails.category} onChange={(e) => { setQuestionDetails({ ...questionDetails, category: e.target.value });handleSubCategoryData(e.target.value); }} className='outline-none border w-full h-10 rounded'>
                            <option key={0} value="">None</option>
                            {
                              parentCategoryData &&  parentCategoryData?.map((categoryItem: any) => {
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
                                childCategoryData?.map((categoryItem: any) => {
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
                        <label className='text-[0.85rem] py-2'>Title</label>
                        <Input className='w-full my-1' value={mainDetails?.title} onChange={(e) => setMainDetails({ ...mainDetails, title: e.target.value })} />

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
                                        <div key={i} className='flex items-center gap-x-2'>
                                            <input checked={opt.status} type="checkbox" onChange={(e) => { let temp = [...options.select_options]; for (let i = 0; i < temp.length; i++) { temp[i].status = false; } temp[i].status = e.target.checked; setOptions({ ...options, select_options: temp }) }} />
                                            <p>{alphabets[i]}</p>
                                            <Editor index={4 + i} placeholder='Enter Here' value={opt.option} onChange={(e: any) => {
                                                let temp = [...options.select_options]; temp[i].option = e; setOptions({ ...options, select_options: temp });
                                            }} />
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
                        <Editor index={3} placeholder='Enter your explanation here' value={mainDetails.answer_explanation} onChange={(e: any) => setMainDetails({ ...mainDetails, answer_explanation: e })} />
                    </div>

                </div>

                {/* <div className='p-3 mt-3'>
                <p className='my-2'>Question*</p>
                <ReactQuill  formats={formats} modules={modules} theme="snow" value={value} onChange={setValue} />
            </div>
             */}


            </section>
        </section> 
    )
}

export default AddNewQuestion


// let modules = {
//     toolbar: [
//         [{ 'header': [1, 2, false] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//         ['link', 'image'],
//         ['clean']
//     ],
// }

// let formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
// ]

