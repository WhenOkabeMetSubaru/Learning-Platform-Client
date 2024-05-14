"use client"
import { addNewBundleByUser, getAllBundlesByMock, updateBundleByID } from '@/features/apiQueries/bundleapi'
import { addNewMockByUser, getPendingMockByUser, updateMockByID } from '@/features/apiQueries/mockapai'
import { getAllQuestionsByBundle } from '@/features/apiQueries/questionapi'
import { Form, Input, Modal, notification, Select, Switch } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaLock } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const AddNewMock = () => {

    const [sectionAddDetails, setSectionAddDetails] = useState({ open: false, name: "" });
    const [bundleData, setBundleData] = useState([]);
    const [questionData, setQuestionData] = useState([]);
    const [mockDetails, setMockDetails] = useState<any>(null);
    const [showMockEditBox, setShowMockEditBox] = useState<boolean>(false);
    const [showBundleEditBox, setShowBundleEditBox] = useState(false);

    const [mockTimeStatus, setMockTimeStatus] = useState(mockDetails?.is_sectional_locked || false);

    const [mockEditForm] = Form.useForm();
    const [bundleEditForm] = Form.useForm();


    const router = useRouter();

    useEffect(() => {

        const url = new URL(window.location.href);
        let mockId = url.searchParams.get('mockId');

        async function fetchPendingMock() {
            let data = await getPendingMockByUser()

            if (data.status == true) {
                let finalData = await addNewMockByUser({ title: "Mock1", total_questions: 66, mock_type: "paper" });
                console.log(finalData)
                if (finalData.status == false) {
                    setMockDetails(finalData?.data);
                    setMockTimeStatus(finalData?.data?.is_sectional_locked)
                    return finalData.data._id;
                }
            }
            setMockDetails(data?.data);
            setMockTimeStatus(data?.data?.is_sectional_locked)
            return data.data._id;
        }

        if (!mockId || !mockDetails) {
            fetchPendingMock().then((id: string) => {
                mockId = id;
                fetchAllBundlesByMock(id);
                url.searchParams.set('mockId', id);

                window.history.replaceState(null, "", url);
            })

        }


        if (mockId) {
            fetchAllBundlesByMock(mockId);
        }


    }, [])



    async function fetchAllBundlesByMock(id?: any) {
        let data = await getAllBundlesByMock(id);
        if (data.status == false) {
            setBundleData(data.data)
        }
    }

    async function handleBundleAddToMock() {
        const url = new URL(window.location.href);
        let mockId = url.searchParams.get('mockId');
        let response = await addNewBundleByUser({ title: sectionAddDetails.name, mock: mockId });

        if (response.status == false) {

            await fetchAllBundlesByMock(mockId);
        }

        setSectionAddDetails({ name: "", open: false })
    }


    const handleFinishMock = async () => {
        const url = new URL(window.location.href);
        let mockId: any = url.searchParams.get('mockId');
        let response = await updateMockByID({ completion_status: "completed" }, mockId || mockDetails?._id);

        if (response.status == false) {
            router.push("/user/profile")
        }
    }

    const handleMockEditFinish = async (values: any) => {
        const url = new URL(window.location.href);
        let mockId: any = url.searchParams.get('mockId');
        let response = await updateMockByID(values, mockId || mockDetails?._id);

        if (response.status == false) {
            notification.success({ message: response.info })
        }
        setShowMockEditBox(false);
        mockEditForm.resetFields();
    }


    const handleBundleEditFinish = async (values: any) => {

        const url = new URL(window.location.href);
        let mockId: any = url.searchParams.get('mockId');
        let bundleId = values?._id;
        values.sno = +values?.sno;
        values.section_timer = +values?.section_timer
        delete values._id;
        let res = await updateBundleByID(values, bundleId);

        if (res.status == false) {
            notification.success({ message: res.info })
        }

        bundleEditForm.resetFields();
        setShowBundleEditBox(false);

    }


    return (
        <section>
            <header className='h-16 w-full left-0 flex justify-between px-3 items-center right-0 top-0 shadow'>
                <div>
                    <Link href={"/"}><div className='w-40 rounded text-2xl font-semibold' />TEST FEVER</Link>
                </div>
                <div className='flex gap-x-4'>
                    <div className='gap-x-2 items-center flex'>
                        <Switch className='border bg-gray-200' title='Section Locked' checked={mockTimeStatus} onChange={async (status) => {
                            setMockTimeStatus(status);
                            updateMockByID({ is_sectional_locked: status }, mockDetails?._id);
                        }} />
                        <FaLock title='Section Locked' size={15} />
                    </div>
                    <button onClick={() => { mockEditForm.setFieldsValue(mockDetails); setShowMockEditBox(true); }} className='w-32 h-9 hover:bg-lime-700 bg-lime-600 text-white flex justify-center rounded items-center'><p>Edit</p></button>
                    <button onClick={handleFinishMock} className='w-32 h-9 hover:bg-purple-700 bg-purple-600 text-white flex justify-center rounded items-center'><p>Finish</p></button>
                </div>
            </header>

            {


                <section className='p-5'>
                    <div className='flex justify-between'>
                        <p className='text-lg font-semibold'>Add Multiple Questions to a Set</p>
                        <button onClick={() => setSectionAddDetails({ ...sectionAddDetails, open: true })} className='w-40 h-10 bg-purple-800 text-white flex justify-center items-center rounded'><p>Add Section</p></button>
                    </div>
                    <div className='mt-5 flex flex-col gap-y-2'>

                        {
                            bundleData?.map((item: any, i) => {
                                return <SectionBlockUI cb1={()=>{
                                    bundleEditForm.resetFields()
                                        bundleEditForm.setFieldsValue(item);
                                       setShowBundleEditBox(true);  
                                }} total_questions={item?.total_questions} bundleId={item?._id} func={() => router.push(`/user/profile/mocks/created/add/question?bundleId=${item?._id}`)} section_name={item?.title} key={i} />
                            })
                        }


                    </div>
                    {/* <button onClick={() => setTab('question')} className=' w-full hover:bg-gray-50 mt-5 flex justify-center items-center border h-12 rounded'>
                        <p>Add Question</p>
                    </button> */}

                </section>
            }
            {
                sectionAddDetails.open == true && <section className='min-h-screen z-40 flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 bg-[rgba(22,22,22,0.48)]'>
                    <div className='w-1/2 h-60 bg-white rounded-lg'>
                        <div className='flex border-b py-3 px-5 items-center justify-between'>
                            <p>Add Section</p>
                            <p onClick={() => { setSectionAddDetails({ ...sectionAddDetails, open: false }) }} className='text-lg cursor-pointer font-semibold '>X</p>
                        </div>
                        <div className='mt-10 flex flex-col w-full px-5'>
                            <label className='text-[0.9rem]'>Section Name</label>
                            <input value={sectionAddDetails.name} onChange={(e) => setSectionAddDetails({ ...sectionAddDetails, name: e.target.value })} className='outline-none  px-3 h-10 bg-gray-50 rounded border ' />
                            <div className='flex justify-center mt-3'>
                                <button onClick={handleBundleAddToMock} className='bg-purple-800 w-40 h-10 text-white rounded flex justify-center items-center'><p>Create</p></button>
                            </div>
                        </div>
                    </div>
                </section>
            }
            <Modal footer="" open={showMockEditBox} onCancel={() => { setShowMockEditBox(false) }} title="Edit Mock" >
                <Form form={mockEditForm} className='my-3' layout='vertical' requiredMark={false} onFinish={handleMockEditFinish}>
                    <Form.Item name="title" >
                        <Input className='rounded-sm py-2' placeholder='Enter Mock Title' />
                    </Form.Item>
                    {
                        mockTimeStatus == false && <Form.Item name="total_mock_length" >
                            <Input className='rounded-sm py-2' placeholder='Enter Time(Minutes)' />
                        </Form.Item>
                    }
                    <Form.Item name="difficulty">
                        <Select defaultValue={"easy"} className='rounded-sm h-9'>
                            <Select.Option value="easy">Easy</Select.Option>
                            <Select.Option value="moderater">Moderate</Select.Option>
                            <Select.Option value="hard">Hard</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="description" >
                        <Input.TextArea rows={5} className='rounded-sm' placeholder='Enter Description' />
                    </Form.Item>
                    <div className='w-full mt-3'>
                        <button className='w-full h-9 font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded shadow flex justify-center items-center'>
                            <p>Save</p>
                        </button>
                    </div>
                </Form>
            </Modal>

            <Modal footer="" open={showBundleEditBox==true} onCancel={() => { setShowBundleEditBox(false) }} title="Edit Section" >
                <Form form={bundleEditForm} className='my-3' layout='vertical' requiredMark={false} onFinish={handleBundleEditFinish}>
                    <Form.Item name="title" >
                        <Input className='rounded-sm py-2' placeholder='Enter Mock Title' />
                    </Form.Item>
                    <Form.Item name="_id" hidden />
                    <Form.Item name="sno" >
                        <Input className='rounded-sm py-2' placeholder='Enter S.No' />
                    </Form.Item>
                    {
                        mockTimeStatus == true && <Form.Item name="section_timer" >
                            <Input className='rounded-sm py-2' placeholder='Enter Time(Minutes)' />
                        </Form.Item>
                    }
                    <Form.Item name="difficulty">
                        <Select defaultValue={"easy"} className='rounded-sm h-9'>
                            <Select.Option value="easy">Easy</Select.Option>
                            <Select.Option value="moderater">Moderate</Select.Option>
                            <Select.Option value="hard">Hard</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="description" >
                        <Input.TextArea rows={5} className='rounded-sm' placeholder='Enter Description' />
                    </Form.Item>
                    <div className='w-full flex flex-col gap-y-2 mt-3'>
                        <button className='w-full h-9 font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded shadow flex justify-center items-center'>
                            <p>Save</p>
                        </button>
                        <button className='w-full h-9 font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow flex justify-center items-center'>
                            <MdDelete size={25}/>
                        </button>
                    </div>
                </Form>
            </Modal>
        </section>
    )
}

export default AddNewMock


const SectionBlockUI = ({ total_questions = 0, section_name,cb1, questions, func, bundleId }: {cb1?:any, func?: any, bundleId: string, section_name?: string, total_questions?: number, questions?: any }) => {

    const [open, setOpen] = useState<Boolean>(false);
    const [questionData, setQuestionData] = useState([]);

    useEffect(() => {
        fetchQuestionsByBundle(bundleId)
    }, [])

    async function fetchQuestionsByBundle(bundleId: any) {
        let data = await getAllQuestionsByBundle(bundleId);
        if (data.status == false) {
            setQuestionData(data.data);
        }
    }

    return (
        <section  className={`bg-gray-100 cursor-pointer overflow-hidden rounded-xl w-full ${open == true ? 'h-auto' : 'h-12'} duration-500`}>
            <div className='w-full h-10 rounded-xl text-[0.9rem] flex px-3 justify-between items-center'>
                <div className='flex items-center gap-x-2'><FaChevronDown onClick={() => setOpen(!open)} className={`mt-1 duration-300 ${open==true?'rotate-180 ':''}`}/><p>{section_name}</p></div>
                <div className='flex items-center gap-x-3'>
                    <button onClick={cb1} className='w-24 h-8 mt-2 hover:bg-indigo-700 bg-indigo-600 text-white flex justify-center rounded items-center'><p>Edit</p></button>
                    <p>{total_questions} Questions</p>
                </div>
                
            </div>
            {
                open == true &&
                <div className='bg-gray-200 rounded m-3 flex flex-col gap-y-1'>
                    {
                        questionData?.map((item: any, n: number) => {
                            return (
                                <div key={item?._id} className='px-3 py-3.5 font-semibold rounded-xl'>
                                    Question {n + 1}
                                </div>
                            )
                        })
                    }

                    <div className='m-3'>
                        <button onClick={func} className='w-full flex justify-center items-center h-12 bg-purple-800 text-white rounded'>
                            <p>Add Question</p>
                        </button>
                    </div>
                </div>

            }
        </section>
    )
}