
"use client"
import { useState } from "react";
import { MdKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowDropDown } from "react-icons/md";


export const checkCorrectAnswer = ({user_answer,correct_answer}:{user_answer:string,correct_answer:string})=>{
    console.log("mate",user_answer,correct_answer)
    if(user_answer==correct_answer){
        return true;
    }
    return false;
}

export const CustomCollapseCard = ({questionDetails,bundleDetails,setCurrentQuestion }:{questionDetails:any,bundleDetails:any,setCurrentQuestion:any}) => {
    const [open, setOpen] = useState(false);

    return (
        <section>
            <div onClick={() => { setOpen(!open) }} className="w-full cursor-pointer h-[7vh] gap-x-1 items-center px-2 flex relative border bg-sky-500 text-white rounded-sm">
                <MdOutlineArrowDropDown color="white" size={20} className="" />
                <p>{bundleDetails?.title}</p>
                < MdOutlineArrowBackIosNew size={15} color="white" className={`${open == true ? '-rotate-90' : 'rotate-0'} font-semibold absolute right-2 top-4 duration-200`} />
            </div>
            <div className={`${open == true ? "min-h-[40vh] p-3 rounded-b-sm bg-red-white shadow" : "min-h-0 h-0"} duration-200`}>
                {
                    open == true &&
                    <div className="flex flex-wrap gap-3">
                       {
                        questionDetails[bundleDetails?._id]?.map((question:any,num:number)=>{
                            return (
                                <div onClick={() => setCurrentQuestion(question)} key={"ifsk" +question?._it +num} className={`w-[3.1rem] h-[3.1rem] relative cursor-pointer rounded-full ${(question?.question_status == 'answered' || question?.question_status == 'reviewed_and_answered') ? (checkCorrectAnswer({ user_answer: question?.user_answer, correct_answer: question?.correct_answer }) == true ? '  text-white bg-green-500' : 'bg-red-500 text-white') :'bg-gray-100 text-[#616161]'} shadow border flex justify-center items-center `}>
                                    <p className="text-[0.95rem] z-10 font-semibold">{question?.question_count}</p>
                                    <div className={`hover:w-[3rem] w-7 h-7 m-auto  hover:h-[3rem] rounded-full absolute top-0 right-0  left-0 bottom-0 bg-none hover:bg-[rgba(25,74,29,0.1)] duration-500 ${(question?.question_status == 'answered' || question?.question_status == 'reviewed_and_answered') ? (checkCorrectAnswer({ user_answer: question?.user_answer, correct_answer: question?.correct_answer }) == true ? '  hover:bg-green-700' : 'hover:bg-red-500 ') : 'hover:bg-gray-200'} `}></div>
                                </div>
                            )
                        })
                       }
                    </div>
                }
            </div>
        </section>
    )
}





export const Tabs = ({ children, name, tab }:any) => {
    return (

        tab == name ? <section className="w-full"  >{children}</section> : <></>
    )
}