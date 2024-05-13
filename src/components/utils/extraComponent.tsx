
import { useState } from "react";
import { MdKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowDropDown } from "react-icons/md";


export const CheckCorrectAnswer = ({user_answer,correct_answer}:{user_answer:string,correct_answer:string})=>{
    console.log(user_answer,correct_answer)
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
                        questionDetails[bundleDetails?._id]?.map((question:any)=>{
                            return (
                                <div onClick={()=>setCurrentQuestion(question)} key={question?._it} className={`w-[3.1rem] h-[3.1rem] cursor-pointer rounded-full ${(question?.question_status=='answered' || question?.question_status=='reviewed_and_answered')?(CheckCorrectAnswer({user_answer:question?.user_answer,correct_answer:question?.correct_answer})==true?'bg-green-400 text-white':'bg-red-500 text-white'):'bg-gray-100 text-black'} shadow border flex justify-center items-center `}>
                                    <p className="text-[0.95rem] font-semibold">{question?.question_count}</p>
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