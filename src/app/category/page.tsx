"use client"
import UserAuth from '@/features/contextApi/userAuthProvider'
import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/userLayout'
import { Form, Input, notification, Select } from 'antd'
import { addNewCategoryByUser, getAllCategories, getAllParentCategories } from '@/features/apiQueries/categoryapi'

const Category = () => {


    const [parentCategoryDetails, setParentCategoryDetails] = useState([]);
    const [categoryDetails,setCategoryDetails] = useState([]);

    const [addForm] = Form.useForm();

    useEffect(() => {

        getAllParentCategories().then((res) => {
            if (res.status == false) {
                setParentCategoryDetails(res?.data)
            }
        })

        getAllCategories().then((res)=>{
            if(res.status==false){
                setCategoryDetails(res?.data)
            }
        })
        

    }, [])

    const handleAddCategory = async (values: any) => {

        if(values.category_type=='child' && !values.parent_category){
            return notification.error({message:"Parent Cannot be empty for child type"})
        }

        if(values?.parent_category){
            values.category_type = 'child';
        }
        let response = await addNewCategoryByUser(values);

        if (response.status == false) {
            notification.success({message:response.info})
            getAllParentCategories().then((res) => {
                if (res.status == false) {
                    setParentCategoryDetails(res?.data)
                }
            })
            getAllCategories().then((res) => {
                if (res.status == false) {
                    setCategoryDetails(res?.data)
                }
            })
        }else{
            notification.error({message:response.info})
        }

      
    }

    return (
        <UserLayout>
            <section className='p-3 pb-20'>
                <p className='text-lg'>Categories</p>
                <Form className='pt-5 w-1/3' layout='vertical' form={addForm} onFinish={handleAddCategory} requiredMark={false}>
                    <Form.Item rules={[{ required: true, message: "Name cannot be empty" }]} name="name" label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Category Description">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="parent_category" label="Parent Category">
                        <Select>
                            {
                                parentCategoryDetails?.map((item: any, i: number) => {
                                    return <Select.Option value={item?._id} key={i}>{item?.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item rules={[{ required: true, message: "Type is required" }]} name="category_type" label="Category Type">
                        <Select>
                            <Select.Option value={"parent"}>Main Category</Select.Option>
                            <Select.Option value={"child"}>Sub Category</Select.Option>
                        </Select>
                    </Form.Item>
                    <button className='w-48 h-10 rounded bg-blue-800 text-white flex justify-center items-center'>
                            <p>Add</p>
                    </button>
                </Form>

                <div className='pt-5 grid grid-cols-3 gap-3'>
                    {
                        categoryDetails?.map((item:any)=>{
                            return <div key={item?._id} className='h-20 flex w-full rounded border p-3'>
                                <p>{item?.name} - {item?.category_type}</p>
                            </div>
                        })
                    }
                </div>
            </section>
        </UserLayout>
    )
}

export default Category